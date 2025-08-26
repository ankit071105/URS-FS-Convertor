# URS to FS Converter

A simple web application that converts User Requirement Specification (URS) Excel files to Functional Specification (FS) Excel files using intelligent rule-based processing.

## Features

- ✅ **No API Keys Required** - Works completely offline in your browser
- ✅ **Drag & Drop Interface** - Easy file upload with visual feedback
- ✅ **Intelligent Processing** - Smart feature/function generation based on requirement types
- ✅ **Excel Compatible** - Reads .xlsx and .xls files, outputs Excel format
- ✅ **Real-time Preview** - See your data before and after conversion
- ✅ **Professional Output** - Generated FS looks human-created with enhanced descriptions

## How to Use

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No installation or setup required!

2. **Upload Your URS File**
   - Drag and drop your URS Excel file onto the upload area
   - Or click to browse and select your file

3. **Required URS Columns**
   Your Excel file must have these columns:
   - `Requirement ID`
   - `Requirement Type`
   - `Link to process`
   - `Requirement Description`
   - `Comment`
   - `Requirement Active?`

4. **Generate FS**
   - Preview your URS data
   - Click "Generate Functional Specification"
   - Watch the real-time processing

5. **Download Results**
   - Review the generated FS in the preview table
   - Click "Download FS Excel" to save your file

## Generated FS Format

The output Excel file will have these columns:
- **FS ID** - Auto-generated unique identifier (FS-001, FS-002, etc.)
- **Reference URS ID** - Links back to original URS requirement
- **Feature/Function** - Intelligently generated based on requirement type and description
- **Description** - Enhanced description with technical implementation details
- **Comments** - Original comments plus implementation notes
- **Requirement Active?** - Copied from URS

## Intelligent Features

### Smart Feature Generation
The application analyzes your requirements and generates appropriate features:
- **Authentication** requirements → "User Authentication Module"
- **Reporting** requirements → "Reporting and Analytics Dashboard"
- **Search** requirements → "Advanced Search and Filter System"
- **Security** requirements → "Data Protection System"
- And many more intelligent mappings!

### Enhanced Descriptions
- Adds technical implementation context
- Includes error handling and validation notes
- Provides security and performance considerations
- Maintains professional documentation standards

### Requirement Type Processing
Different processing for:
- **Functional** - UI components and business logic
- **Non-functional** - Performance and scalability
- **Interface** - API design and integration
- **Security** - Encryption and access controls

## Deployment Options

### Local Use
Just open `index.html` in your browser - works immediately!

### Web Hosting (Static)
Upload all files to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

### No Backend Required
- Pure client-side JavaScript
- No server setup needed
- No databases required
- No API keys or subscriptions

## Browser Compatibility

Works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: 
  - SheetJS (Excel processing)
  - Bootstrap 5 (UI framework)
  - Font Awesome (icons)
- **No Backend**: Pure client-side processing
- **File Size**: Lightweight (~50KB total)

## Sample Data

If you need sample URS data for testing, create an Excel file with:

| Requirement ID | Requirement Type | Link to process | Requirement Description | Comment | Requirement Active? |
|----------------|------------------|-----------------|------------------------|---------|-------------------|
| URS-001 | Functional | Login Process | User shall be able to login with username and password | Critical for security | Yes |
| URS-002 | Security | Authentication | System must validate user credentials against database | Implement encryption | Yes |
| URS-003 | Interface | API Integration | Application shall connect to external payment gateway | Third-party service | Yes |

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check that your Excel file has all required columns
2. Ensure your browser supports modern JavaScript
3. Try with a smaller file if processing seems slow
4. Clear browser cache if you encounter issues

---

**Ready to convert your URS to FS? Just open index.html and get started!**
