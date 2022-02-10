import { render, screen, fireEvent } from "@testing-library/react";
import CatalogueContainer, { CatalogueItem } from "./CatalogueContainer";
import '@testing-library/jest-dom'
import React from 'react'

const catalogue: CatalogueItem[] = [{
    id: 0,
    text: "First Column 1",
    items: [{
        id: 11,
        text: "Second Column 1 - 1"
    }, {
        id: 12,
        text: "Second Column 1 - 2"
    }, {
        id: 13,
        text: "Second Column 1 - 3"
    }]
}, {
    id: 1,
    text: "First Column 2",
    items: [{
        id: 21,
        text: "Second Column 2 - 1"
    }, {
        id: 22,
        text: "Second Column 2 - 2"
    }, {
        id: 23,
        text: "Second Column 2 - 3"
    }]
}]

it('should change active column by clicking', async () => {
    render(<CatalogueContainer catalogue={catalogue} />);
    fireEvent.click(screen.getByText("First Column 2"));
    expect(screen.getByText("Second Column 2 - 1")).toBeInTheDocument();
});

it('should reset second columns div after first column is changed', () => {
    render(<CatalogueContainer catalogue={catalogue} />);
    fireEvent.click(screen.getByText("First Column 1"));
    const secondColumn: HTMLDivElement = screen.getByTestId('column-2');
    secondColumn.scrollTop = 150;
    fireEvent.click(screen.getByText("First Column 2"));
    expect(screen.getByTestId('column-2').scrollTop).toBe(0);
}); 