# Source Mapping

Source mapping starts from test files and is finalized against final files. The point is to map source codes that actually carry balances, get QA approval, and be ready to add any new final-file source immediately.

## Inputs
- Test files
- Final files
- Vendor source code summaries
- TA source ID query results
- QA source mapping file

## Systems
- AQT
- QA review
- Source mapping workbook

## Procedure Steps
1. Summarize vendor balances by source code and vendor source name.
2. Ignore source codes that never carry money unless QA asks otherwise.
3. Run the AQT query to retrieve the TA source IDs.
4. Fill the mapping file with vendor source code, vendor source name, and TA source ID.
5. Send source mapping to QA for review.
6. Re-check final files for new source codes and rush any needed additions.

## Decisions
- Does the source have money?
- Did final files introduce a new source?
- Is QA approval complete before balance processing?
- Are vendor codes and names preserved clearly enough to show work?

## Outputs
- Approved source mapping file
- Source IDs for balance workflows
- Final-file source change list

## Watchouts
- Do not waste time mapping sources with no balances unless needed.
- Final files can introduce new sources, so re-check before processing.
- Show vendor code and vendor name together so QA can follow the mapping.

## Closeout Checks
- QA approval received
- Final-file source check complete
- All balance-bearing sources mapped
- Mapping evidence retained
