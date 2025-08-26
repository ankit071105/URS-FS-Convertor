# URS Upload Troubleshooting Guide

If the Excel file is not uploading, follow these steps:

## Step 1: Check Browser Console
1. Open the application in your browser
2. Press `F12` or right-click and select "Inspect"
3. Go to the "Console" tab
4. Try uploading your file
5. Look for any red error messages

## Step 2: Verify File Format
- Ensure your file has `.xlsx` or `.xls` extension
- File should not be corrupted
- Try opening the file in Excel first to verify it works

## Step 3: Check Required Columns
Your Excel file MUST have these exact column names (case-sensitive):
- `Requirement ID`
- `Requirement Type`
- `Link to process`
- `Requirement Description`
- `Comment`
- `Requirement Active?`

## Step 4: Test with Sample File
1. Use the provided `sample_urs.xlsx` file to test
2. If sample works but your file doesn't, compare the column names
3. Make sure there are no extra spaces in column names

## Step 5: Browser Issues
Try these solutions:
- **Clear browser cache**: Ctrl+F5 to hard refresh
- **Try different browser**: Chrome, Firefox, Edge
- **Disable browser extensions**: Some ad blockers can interfere
- **Check internet connection**: The app needs to load libraries from CDN

## Step 6: File Size Issues
- Large files (>10MB) may take longer to process
- Try with a smaller subset of your data first
- Break large files into smaller chunks

## Step 7: Corporate Network Issues
If using on a corporate network:
- CDN libraries might be blocked
- Contact IT administrator
- Try on personal device/network

## Common Error Messages:

### "XLSX library not loaded"
- Internet connection issue
- CDN blocked by firewall
- Try refreshing the page

### "Missing required columns"
- Column names don't match exactly
- Check for typos or extra spaces
- Use the exact names listed above

### "Excel file appears to be empty"
- File has no data rows
- Only header row exists
- File is corrupted

## Quick Test:
1. Open `test.html` in the same folder
2. Try uploading your Excel file
3. Check if data appears in the test page
4. If test works but main app doesn't, it's a UI issue

## Still Having Issues?
1. Check the debug panel in the main application
2. Compare your file structure with `sample_urs.xlsx`
3. Try creating a new Excel file with the exact column names
4. Test with just 2-3 rows of data first
