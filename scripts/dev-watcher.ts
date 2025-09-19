import { type ChildProcess, spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import chokidar from 'chokidar';

let devServer: ChildProcess | null = null;
let startTimeout: NodeJS.Timeout | null = null;

function startDevServer(): void {
  if (devServer) {
    devServer.kill();
  }

  if (startTimeout) {
    clearTimeout(startTimeout);
  }

  console.log('🚀 Starting Next.js dev server...');
  devServer = spawn('bun', ['run', 'dev'], {
    stdio: 'pipe',
    cwd: process.cwd(),
  });

  devServer.stdout?.on('data', (data) => {
    const output = data.toString();
    process.stdout.write(output);

    if (output.includes('Ready in')) {
      console.log('✅ Dev server is ready!');
      if (startTimeout) {
        clearTimeout(startTimeout);
        startTimeout = null;
      }
    }
  });

  devServer.stderr?.on('data', (data) => {
    process.stderr.write(data);
  });

  devServer.on('error', (error) => {
    console.error('❌ Dev server error:', error);
    if (startTimeout) {
      clearTimeout(startTimeout);
      startTimeout = null;
    }
  });

  devServer.on('exit', (code, signal) => {
    console.log(`🔄 Dev server exited with code ${code} and signal ${signal}`);
    if (startTimeout) {
      clearTimeout(startTimeout);
      startTimeout = null;
    }
  });

  startTimeout = setTimeout(() => {
    if (devServer && !devServer.killed) {
      console.log('⏰ Dev server startup timeout - restarting...');
      devServer.kill();
      startDevServer();
    }
  }, 10_000);

  devServer.on('spawn', () => {
    console.log('✅ Dev server spawned successfully');
    if (startTimeout) {
      clearTimeout(startTimeout);
      startTimeout = null;
    }
  });
}

function clearCacheAndRestart(): void {
  console.log('🧹 Clearing .next cache...');
  if (existsSync('.next')) {
    rmSync('.next', { recursive: true });
    console.log('✅ Cache cleared');
  } else {
    console.log('ℹ️  No .next cache to clear');
  }
  startDevServer();
}

// 監視対象: ページファイルの追加/削除/移動
const watcher = chokidar.watch(
  [
    'app/**/page.tsx',
    'app/**/layout.tsx',
    'app/**/not-found.tsx',
    'next.config.ts',
    'tsconfig.json',
  ],
  {
    ignored: ['node_modules', '.next'],
    ignoreInitial: true,
  }
);

watcher
  .on('add', (path: string) => {
    console.log(`📄 Page added: ${path}`);
    clearCacheAndRestart();
  })
  .on('unlink', (path: string) => {
    console.log(`🗑️  Page removed: ${path}`);
    clearCacheAndRestart();
  })
  .on('change', (path: string) => {
    if (path.includes('next.config.ts') || path.includes('tsconfig.json')) {
      console.log(`⚙️  Config changed: ${path}`);
      clearCacheAndRestart();
    }
  });

// 初回起動
console.log('🔧 Starting dev-watcher...');
clearCacheAndRestart();

// 終了処理
process.on('SIGINT', () => {
  if (startTimeout) {
    clearTimeout(startTimeout);
  }
  if (devServer) {
    devServer.kill();
  }
  process.exit();
});
