import jsPDF from 'jspdf';

export interface ExportData {
  type: 'portfolio' | 'alerts' | 'transactions';
  data: any[];
  filename: string;
}

// Sample data for demonstration
const samplePortfolioData = [
  { symbol: 'AAPL', shares: 100, avgPrice: 150.25, currentPrice: 175.30, value: 17530 },
  { symbol: 'GOOGL', shares: 50, avgPrice: 2450.00, currentPrice: 2680.75, value: 134037.50 },
  { symbol: 'MSFT', shares: 75, avgPrice: 310.50, currentPrice: 340.25, value: 25518.75 },
];

const sampleAlertData = [
  { date: '2024-01-15', symbol: 'AAPL', type: 'Price Alert', message: 'AAPL reached $175', triggered: true },
  { date: '2024-01-14', symbol: 'GOOGL', type: 'Volume Alert', message: 'GOOGL volume spike detected', triggered: true },
  { date: '2024-01-13', symbol: 'MSFT', type: 'Price Alert', message: 'MSFT above $340', triggered: false },
];

const sampleTransactionData = [
  { date: '2024-01-10', type: 'BUY', symbol: 'AAPL', shares: 50, price: 172.50, total: 8625 },
  { date: '2024-01-08', type: 'SELL', symbol: 'GOOGL', shares: 25, price: 2675.25, total: 66881.25 },
  { date: '2024-01-05', type: 'BUY', symbol: 'MSFT', shares: 75, price: 338.75, total: 25406.25 },
];

const formatCurrency = (amount: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const exportPortfolioToPDF = () => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Portfolio Summary Report', 20, 30);
  
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
  
  // Table headers
  const headers = ['Symbol', 'Shares', 'Avg Price', 'Current Price', 'Total Value'];
  let yPosition = 65;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  headers.forEach((header, index) => {
    doc.text(header, 20 + (index * 35), yPosition);
  });
  
  // Table data
  doc.setFont(undefined, 'normal');
  samplePortfolioData.forEach((row, rowIndex) => {
    yPosition += 15;
    doc.text(row.symbol, 20, yPosition);
    doc.text(row.shares.toString(), 55, yPosition);
    doc.text(formatCurrency(row.avgPrice), 90, yPosition);
    doc.text(formatCurrency(row.currentPrice), 125, yPosition);
    doc.text(formatCurrency(row.value), 160, yPosition);
  });
  
  // Summary
  const totalValue = samplePortfolioData.reduce((sum, item) => sum + item.value, 0);
  yPosition += 30;
  doc.setFont(undefined, 'bold');
  doc.text(`Total Portfolio Value: ${formatCurrency(totalValue)}`, 20, yPosition);
  
  return doc;
};

const exportAlertsToPDF = () => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Alert History Report', 20, 30);
  
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
  
  // Table headers
  const headers = ['Date', 'Symbol', 'Type', 'Message', 'Status'];
  let yPosition = 65;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  headers.forEach((header, index) => {
    doc.text(header, 20 + (index * 35), yPosition);
  });
  
  // Table data
  doc.setFont(undefined, 'normal');
  sampleAlertData.forEach((row, rowIndex) => {
    yPosition += 15;
    doc.text(row.date, 20, yPosition);
    doc.text(row.symbol, 55, yPosition);
    doc.text(row.type, 90, yPosition);
    doc.text(row.message.substring(0, 20) + '...', 125, yPosition);
    doc.text(row.triggered ? 'Triggered' : 'Pending', 160, yPosition);
  });
  
  return doc;
};

const exportTransactionsToPDF = () => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Transaction History Report', 20, 30);
  
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
  
  // Table headers
  const headers = ['Date', 'Type', 'Symbol', 'Shares', 'Price', 'Total'];
  let yPosition = 65;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  headers.forEach((header, index) => {
    doc.text(header, 20 + (index * 30), yPosition);
  });
  
  // Table data
  doc.setFont(undefined, 'normal');
  sampleTransactionData.forEach((row, rowIndex) => {
    yPosition += 15;
    doc.text(row.date, 20, yPosition);
    doc.text(row.type, 50, yPosition);
    doc.text(row.symbol, 80, yPosition);
    doc.text(row.shares.toString(), 110, yPosition);
    doc.text(formatCurrency(row.price), 140, yPosition);
    doc.text(formatCurrency(row.total), 170, yPosition);
  });
  
  return doc;
};

export const exportToPDF = (type: 'portfolio' | 'alerts' | 'transactions') => {
  let doc: jsPDF;
  let filename: string;
  
  switch (type) {
    case 'portfolio':
      doc = exportPortfolioToPDF();
      filename = `portfolio-report-${new Date().toISOString().split('T')[0]}.pdf`;
      break;
    case 'alerts':
      doc = exportAlertsToPDF();
      filename = `alert-history-${new Date().toISOString().split('T')[0]}.pdf`;
      break;
    case 'transactions':
      doc = exportTransactionsToPDF();
      filename = `transaction-history-${new Date().toISOString().split('T')[0]}.pdf`;
      break;
    default:
      throw new Error('Invalid export type');
  }
  
  doc.save(filename);
};