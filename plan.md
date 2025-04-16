# Double Checking App for Clinical Trial Protocols

## 1. Requirements
- Input two sets of date/time data (as free text, unformatted, possibly in Korean/English mix)
- Parse both inputs into structured lists of date/time points
- Compare the two sets and highlight differences (missing, extra, mismatched entries)
- Simple, user-friendly UI for clinical project leaders
- Optionally, export or copy results

## 2. Parsing Logic
- Design a parser to extract all relevant date/time points from the free text
  - Recognize patterns like `Day X`, `투여 전(0 h)`, `투여 후 Y`, `Z(Day N)`, etc.
  - Handle ranges, repeated patterns, and Korean/English mix
  - Normalize all extracted points into a comparable format (e.g., list of objects: `{day: 1, time: 0, type: 'pre-dose'}`)
- Build robust regex or NLP-based extraction logic

## 3. UI/UX Design
- Two large text fields for user input (first and second data sets)
- Button to trigger comparison
- Display results:
  - List of all points in each set
  - Highlight differences (missing in set 2, extra in set 2, mismatches)
  - Option to copy/export results
- Responsive, clean design (web-based, React or similar)
- Display results in a table format:
  - Show both data sets side by side, with columns for each protocol, match status, and any additional flags (e.g., interest, warnings), similar to the provided image
  - Use checkmarks, warning icons, and color highlights for matches/mismatches
  - Include search and sorting functionality in the table for easier review
  - (Optional) Allow users to specify a range of dates of interest (e.g., Day -1 ~ Day 2, Day 28 ~ Day 30, Day 56 ~ 58)
    - Provide a text area for inputting date ranges
    - Add a checkbox to filter and display only the specified date ranges in the results table

## 4. Core App Logic
- On compare:
  - Parse both inputs
  - Compare normalized lists
  - Generate difference report
- Handle edge cases (typos, extra spaces, missing units, etc.)

## 5. Technology Stack
- Frontend: React (with TypeScript for type safety)
- Parsing: JavaScript/TypeScript regex and helper functions
- (Optional) Backend: Node.js/Express if saving data or user accounts needed
- Styling: CSS/Styled Components/Chakra UI/Material UI

## 6. Implementation Steps
1. Set up project structure (React app)
2. Build UI with two text fields and compare button
3. Implement parsing logic and test with sample data
4. Implement comparison logic and result display
5. Polish UI/UX, add export/copy features
6. Test with real protocol data, refine parsing

## 7. Future Enhancements
- Support for more complex protocol formats
- User accounts and saving comparison history
- Mobile-friendly version
- Multi-language support

---

**Next Steps:**
- Set up the React project and basic UI
- Start implementing the parser for the provided sample data
