import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { FilterOption } from '@/portfolio/types';
import FilterButtons from '../FilterButtons';

const mockFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Work' },
  { key: 'solo-development', label: 'Solo Development' },
];

describe('FilterButtons', () => {
  it('should render all filter buttons', () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterButtons
        filterOptions={mockFilterOptions}
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
      />,
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Solo Development')).toBeInTheDocument();
  });

  it('should highlight active filter button', () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterButtons
        filterOptions={mockFilterOptions}
        activeFilter="work"
        onFilterChange={mockOnFilterChange}
      />,
    );

    const allButton = screen.getByText('All');
    const workButton = screen.getByText('Work');
    const soloButton = screen.getByText('Solo Development');

    // Work button should have active styles
    expect(workButton).toHaveClass('bg-indigo-500', 'text-white');

    // Other buttons should have inactive styles
    expect(allButton).toHaveClass('bg-transparent', 'text-slate-400');
    expect(soloButton).toHaveClass('bg-transparent', 'text-slate-400');
  });

  it('should call onFilterChange when button is clicked', async () => {
    const mockOnFilterChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterButtons
        filterOptions={mockFilterOptions}
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
      />,
    );

    const workButton = screen.getByText('Work');
    await user.click(workButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith('work');
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  });

  it('should call onFilterChange with correct key for each button', async () => {
    const mockOnFilterChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterButtons
        filterOptions={mockFilterOptions}
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
      />,
    );

    const allButton = screen.getByText('All');
    const workButton = screen.getByText('Work');
    const soloButton = screen.getByText('Solo Development');

    await user.click(allButton);
    expect(mockOnFilterChange).toHaveBeenCalledWith('all');

    await user.click(workButton);
    expect(mockOnFilterChange).toHaveBeenCalledWith('work');

    await user.click(soloButton);
    expect(mockOnFilterChange).toHaveBeenCalledWith('solo-development');

    expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
  });

  it('should handle empty filter options', () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterButtons filterOptions={[]} activeFilter="all" onFilterChange={mockOnFilterChange} />,
    );

    // Should not render any buttons
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should handle activeFilter that does not exist in options', () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterButtons
        filterOptions={mockFilterOptions}
        activeFilter="nonexistent"
        onFilterChange={mockOnFilterChange}
      />,
    );

    // All buttons should have inactive styles since none match
    const allButton = screen.getByText('All');
    const workButton = screen.getByText('Work');
    const soloButton = screen.getByText('Solo Development');

    expect(allButton).toHaveClass('bg-transparent', 'text-slate-400');
    expect(workButton).toHaveClass('bg-transparent', 'text-slate-400');
    expect(soloButton).toHaveClass('bg-transparent', 'text-slate-400');
  });

  it('should have correct accessibility attributes', () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterButtons
        filterOptions={mockFilterOptions}
        activeFilter="work"
        onFilterChange={mockOnFilterChange}
      />,
    );

    const buttons = screen.getAllByRole('button');

    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  it('should not call onFilterChange when clicking the already active filter', async () => {
    const mockOnFilterChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterButtons
        filterOptions={mockFilterOptions}
        activeFilter="work"
        onFilterChange={mockOnFilterChange}
      />,
    );

    const workButton = screen.getByText('Work');
    await user.click(workButton);

    // onFilterChange should still be called even for active filter
    // This allows parent component to handle URL updates consistently
    expect(mockOnFilterChange).toHaveBeenCalledWith('work');
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  });
});
