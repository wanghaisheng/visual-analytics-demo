import React from 'react';
import { BIData } from '../lib/business-intelligence';
import { Collapsible } from './Collapsible';
import { Panel } from './Panel';

interface Props {
  biData: BIData;
  onCheck: (value: string, checked: boolean) => Promise<void>;
  onReset: () => Promise<void>;
  selection?: { color: string; value: number | string };
}

export function Sidebar({
  biData,
  onCheck,
  onReset,
  selection,
}: Props): JSX.Element {
  const mid = (biData.max - biData.min) / 2;
  console.log(biData);

  return (
    <Panel position="right">
      <div className="w-full px-2 border-b">
        <Collapsible title="BUSINESS INTELLIGENCE">
          <div>
            <p className="text-center text-sm mb-4">
              {biData.name ?? 'No data loaded'}
            </p>
            <p className="my-4 text-center text-sm">
              {selection?.value ?? 'No data'}
            </p>
          </div>
          <div className="my-4 text-sm flex justify-center">
            <button
              className="px-3 py-2 bg-gray-200 rounded-md"
              onClick={onReset}
            >
              Reset model
            </button>
          </div>
          {biData.isHeatMap && (
            <div className="h-40 mb-4 bg-gradient-to-b from-green-500 via-yellow-500 to-red-500 grid grid-cols-1 place-content-between text-sm rounded-md">
              <p className="text-center py-1">{biData.min}</p>
              <p className="text-center">
                {mid.toFixed(mid % 1 === 0 ? 0 : 2)}
              </p>
              <p className="text-center py-1">{biData.max}</p>
            </div>
          )}
          {biData.table && biData.table.size > 0 && (
            <table className="text-left mb-4 rounded-md w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-2/12"></th>
                  <th className="w-6/12">Value</th>
                  <th className="w-4/12">Count</th>
                </tr>
              </thead>
              <tbody>
                {[...biData.table.entries()].map(([k, v]) => (
                  <tr key={k}>
                    <td>
                      <input
                        className="rounded-sm ml-4"
                        type="checkbox"
                        checked={v.display}
                        onChange={(e) => onCheck(k, e.target.checked)}
                      />
                    </td>
                    <td className="flex items-center">
                      <div
                        className="rounded-sm mt-0.5 mr-2 h-4 w-4"
                        style={{ backgroundColor: v.color }}
                      ></div>
                      {k}
                    </td>
                    <td>{v.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Collapsible>
      </div>
    </Panel>
  );
}
