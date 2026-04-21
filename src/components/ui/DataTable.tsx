import React from 'react'

interface Column {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps {
  columns: Column[]
  rows: Record<string, any>[]
  zebra?: boolean
  className?: string
}

const DataTable: React.FC<DataTableProps> = ({ 
  columns, 
  rows, 
  zebra = false,
  className = '' 
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-ink-200 bg-moss-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-sm font-semibold text-ink-900 text-${column.align || 'left'}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-ink-200 ${
                zebra && rowIndex % 2 === 1 ? 'bg-cream-50' : 'bg-white'
              } hover:bg-moss-50 transition-colors`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-3 text-sm text-ink-700 text-${column.align || 'left'}`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
