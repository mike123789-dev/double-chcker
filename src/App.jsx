import { useState } from 'react'
import './App.css'

// Helper: Parse protocol text into a set of normalized day strings (e.g., 'Day 1', 'Day 2', ...)
function extractDays(text) {
  // Match patterns like Day 1, Day -1, Day 2, Day 28, Day 56 ~ 58, etc.
  const dayRegex = /Day\s*-?\d+/g;
  const rangeRegex = /Day\s*(-?\d+)\s*~\s*Day\s*(-?\d+)/g;
  let days = new Set();

  // Handle ranges first
  let match;
  while ((match = rangeRegex.exec(text)) !== null) {
    const start = parseInt(match[1], 10);
    const end = parseInt(match[2], 10);
    for (let d = start; d <= end; d++) {
      days.add(`Day ${d}`);
    }
  }

  // Handle individual days
  const singles = text.match(dayRegex);
  if (singles) {
    singles.forEach(day => days.add(day));
  }

  return Array.from(days).sort((a, b) => {
    // Sort numerically by day
    const numA = parseInt(a.replace(/Day\s*/, ''), 10);
    const numB = parseInt(b.replace(/Day\s*/, ''), 10);
    return numA - numB;
  });
}

// Helper: Parse date range filter
function parseDateRanges(text) {
  // e.g., Day -1 ~ Day 2, Day 28 ~ Day 30, Day 56 ~ 58
  const ranges = [];
  const rangeRegex = /Day\s*(-?\d+)\s*~\s*Day\s*(-?\d+)/g;
  const singleRegex = /Day\s*(-?\d+)/g;
  let match;
  // Ranges
  while ((match = rangeRegex.exec(text)) !== null) {
    ranges.push([parseInt(match[1], 10), parseInt(match[2], 10)]);
  }
  // Singles (not in a range)
  const singles = text.replace(rangeRegex, '').match(singleRegex);
  if (singles) {
    singles.forEach(day => {
      const num = parseInt(day.replace(/Day\s*/, ''), 10);
      ranges.push([num, num]);
    });
  }
  return ranges;
}

// Helper: Check if a day is in any of the ranges
function isDayInRanges(day, ranges) {
  const num = parseInt(day.replace(/Day\s*/, ''), 10);
  return ranges.some(([start, end]) => num >= start && num <= end);
}

function App() {
  const [protocol1, setProtocol1] = useState('')
  const [protocol2, setProtocol2] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [filterRangeOnly, setFilterRangeOnly] = useState(false)
  const [results, setResults] = useState(null)

  const handleAnalyze = () => {
    const days1 = extractDays(protocol1);
    const days2 = extractDays(protocol2);
    let allDays = Array.from(new Set([...days1, ...days2]));
    allDays.sort((a, b) => parseInt(a.replace(/Day\s*/, ''), 10) - parseInt(b.replace(/Day\s*/, ''), 10));

    // Optional filtering
    let ranges = [];
    if (dateRange.trim()) {
      ranges = parseDateRanges(dateRange);
      if (filterRangeOnly && ranges.length > 0) {
        allDays = allDays.filter(day => isDayInRanges(day, ranges));
      }
    }

    // Build result rows
    const rows = allDays.map(day => {
      const in1 = days1.includes(day);
      const in2 = days2.includes(day);
      let match = in1 && in2 ? 'match' : 'warn';
      return {
        day,
        protocol1: in1,
        protocol2: in2,
        match,
        isInterest: ranges.length > 0 ? isDayInRanges(day, ranges) : false,
      };
    });
    setResults(rows);
  }

  return (
    <div className="container">
      <h1>임상시험 프로토콜 날짜 더블체크</h1>
      <div className="input-section">
        <div>
          <label>Protocol 1 데이터 입력</label>
          <textarea
            value={protocol1}
            onChange={e => setProtocol1(e.target.value)}
            rows={8}
            placeholder="여기에 첫 번째 프로토콜 데이터를 입력하세요"
          />
        </div>
        <div>
          <label>Protocol 2 데이터 입력</label>
          <textarea
            value={protocol2}
            onChange={e => setProtocol2(e.target.value)}
            rows={8}
            placeholder="여기에 두 번째 프로토콜 데이터를 입력하세요"
          />
        </div>
      </div>
      <div className="filter-section">
        <label>관심 있는 날짜 범위 (선택사항)</label>
        <textarea
          value={dateRange}
          onChange={e => setDateRange(e.target.value)}
          rows={2}
          placeholder="예: Day -1 ~ Day 2, Day 28 ~ Day 30, Day 56 ~ 58"
        />
        <div>
          <input
            type="checkbox"
            checked={filterRangeOnly}
            onChange={e => setFilterRangeOnly(e.target.checked)}
            id="filterRangeOnly"
          />
          <label htmlFor="filterRangeOnly">지정 날짜 범위만 표시</label>
        </div>
      </div>
      <button className="analyze-btn" onClick={handleAnalyze}>분석하기</button>
      <div className="results-section">
        {results && (
          <table className="results-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Protocol1</th>
                <th>Protocol2</th>
                <th>Match</th>
                <th>IsInterest</th>
              </tr>
            </thead>
            <tbody>
              {results.map(row => (
                <tr key={row.day}>
                  <td>{row.day}</td>
                  <td style={{textAlign: 'center'}}>{row.protocol1 ? '✓' : ''}</td>
                  <td style={{textAlign: 'center'}}>{row.protocol2 ? '✓' : ''}</td>
                  <td style={{textAlign: 'center', background: row.match === 'match' ? '#d2f8d2' : '#fffbe6'}}>
                    {row.match === 'match' ? '✓' : '⚠️'}
                  </td>
                  <td style={{textAlign: 'center'}}>{row.isInterest ? '⭐' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default App
