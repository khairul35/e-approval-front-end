const clientId = '219C2261C03B4A3685DF6EDC898EAD97';
const clientSecret = 'x1E_RdPfZxxtC4eICylkSqsrwXZLju8sM1NISfzLL2M6YaAd';
const redirectUris = 'http://localhost/';
const scopes = [
  'openid',
  'profile',
  'email',
  'accounting.transactions',
  'accounting.transactions.read',
  'offline_access',
  'files',
  'payroll.employees',
  'payroll.payruns',
  'payroll.payslip',
  'payroll.timesheets',
  'payroll.settings',
  'projects',
  'accounting.settings',
  'accounting.attachments',
  'accounting.contacts',
  'accounting.reports.read',
  'accounting.journals.read',
  'accounting.budgets.read',
  'accounting.reports.tenninetynine.read',
  'assets',
].join(' ');
// const scopes = 'openid profile email accounting.transactions accounting.transactions.read offline_access';

// "finance.statements.read",  "finance.accountingactivity.read",  "finance.cashvalidation.read",  "finance.bankstatementsplus.read"
export {
    clientId,
    clientSecret,
    redirectUris,
    scopes,
};