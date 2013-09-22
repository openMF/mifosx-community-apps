To Dos
======

1. Transaction support for group loans and group savings -> (Blocker) Can't find an endpoint which returns all loan accounts or all loan accounts associated with groups. /loans returns only individual loans.
2. Better workbook populator unit tests which will use FormulaEvaluator to evaluate if the data validation formulas and in-cell formulas embedded as Strings are not broken due to shifting of columns.
3. Minor improvements to group related features once the release is stable (like sync repayments with meetings).
4. Using a lot of 'and' conditions to reject special characters for all fields as it might lead to sql injection.
