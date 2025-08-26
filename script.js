// Global variables
let ursData = [];
let fsData = [];
let aiEngine = null;

// Initialize AI Engine when DOM loads
function initializeAI() {
    if (typeof URSToFSAI !== 'undefined') {
        aiEngine = new URSToFSAI();
        console.log('AI Engine initialized successfully');
        
        // Update UI to show AI is available
        const aiIndicator = document.createElement('div');
        aiIndicator.className = 'alert alert-success mt-2';
        aiIndicator.innerHTML = '<i class="fas fa-robot"></i> <strong>AI Enhancement Active:</strong> Advanced text processing enabled for intelligent FS generation';
        
        const container = document.querySelector('.container');
        const header = container.querySelector('.header');
        header.appendChild(aiIndicator);
    } else {
        console.warn('AI Engine not available, using fallback logic');
    }
}

// Feature/Function templates based on requirement types
const featureTemplates = {
    'functional': [
        'User Interface Module',
        'Data Processing Engine',
        'Business Logic Controller',
        'Validation Framework',
        'Workflow Management System'
    ],
    'non-functional': [
        'Performance Optimization',
        'Security Framework',
        'Scalability Module',
        'Reliability System',
        'Usability Enhancement'
    ],
    'interface': [
        'API Integration Layer',
        'External System Interface',
        'Data Exchange Module',
        'Communication Protocol',
        'Integration Gateway'
    ],
    'data': [
        'Data Management System',
        'Database Interface',
        'Data Validation Module',
        'Information Repository',
        'Data Processing Pipeline'
    ],
    'security': [
        'Authentication Module',
        'Authorization Framework',
        'Security Validation System',
        'Access Control Module',
        'Data Protection System'
    ],
    'default': [
        'System Component',
        'Application Module',
        'Processing Unit',
        'Control System',
        'Management Interface'
    ]
};

// Description enhancement templates
const descriptionEnhancements = {
    'shall': 'The system shall implement',
    'must': 'The application must provide',
    'should': 'The platform should include',
    'will': 'The solution will feature',
    'can': 'The system can support',
    'may': 'The application may offer'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    
    // Check if XLSX library is loaded
    if (typeof XLSX === 'undefined') {
        console.error('XLSX library not loaded!');
        alert('Error: Excel processing library failed to load. Please refresh the page and try again.');
        return;
    }
    
    console.log('XLSX library loaded successfully');
    
    // Initialize AI Engine
    initializeAI();
    
    initializeEventListeners();
});

function initializeEventListeners() {
    console.log('Initializing event listeners...');
    
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    console.log('Elements found:', {
        uploadArea: !!uploadArea,
        fileInput: !!fileInput,
        generateBtn: !!generateBtn,
        downloadBtn: !!downloadBtn
    });

    if (!uploadArea || !fileInput || !generateBtn || !downloadBtn) {
        console.error('Required DOM elements not found!');
        console.error('Missing elements:', {
            uploadArea: !uploadArea,
            fileInput: !fileInput,
            generateBtn: !generateBtn,
            downloadBtn: !downloadBtn
        });
        alert('Error: Page elements not loaded properly. Please refresh the page.');
        return;
    }

    // File upload events
    uploadArea.addEventListener('click', () => {
        console.log('Upload area clicked');
        fileInput.click();
    });
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);

    // Button events - use event delegation to handle dynamically created buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'generateBtn') {
            console.log('Generate FS button clicked via event delegation');
            e.preventDefault();
            e.stopPropagation();
            generateFunctionalSpecification();
        }
        if (e.target && e.target.id === 'downloadBtn') {
            console.log('Download button clicked via event delegation');
            e.preventDefault();
            e.stopPropagation();
            downloadFSExcel();
        }
    });
    
    // Also add direct event listeners as backup
    generateBtn.addEventListener('click', function(e) {
        console.log('Generate FS button clicked via direct listener');
        e.preventDefault();
        e.stopPropagation();
        generateFunctionalSpecification();
    });
    downloadBtn.addEventListener('click', function(e) {
        console.log('Download button clicked via direct listener');
        e.preventDefault();
        e.stopPropagation();
        downloadFSExcel();
    });
    
    console.log('Event listeners initialized successfully');
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('uploadArea').classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('uploadArea').classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('uploadArea').classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

function handleFileSelect(e) {
    console.log('File selected via input');
    const file = e.target.files[0];
    if (file) {
        console.log('Processing file:', file.name, 'Size:', file.size, 'Type:', file.type);
        processFile(file);
    } else {
        console.log('No file selected');
    }
    
    // Always clear the input value after processing to allow re-selection of same file
    e.target.value = '';
}

function processFile(file) {
    console.log('Processing file:', file.name);
    
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
        console.error('Invalid file type:', file.name);
        alert('Please select a valid Excel file (.xlsx or .xls)');
        return;
    }

    console.log('File type validation passed');
    
    // Show loading indicator
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = '<i class="fas fa-spinner fa-spin fa-3x text-primary mb-3"></i><h4>Processing file...</h4>';

    const reader = new FileReader();
    
    reader.onload = function(e) {
        console.log('File loaded, size:', e.target.result.length);
        try {
            console.log('Attempting to parse Excel file...');
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            console.log('Workbook parsed, sheets:', workbook.SheetNames);
            
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            console.log('JSON data extracted:', jsonData.length, 'rows');
            console.log('First row keys:', Object.keys(jsonData[0] || {}));
            
            if (validateURS(jsonData)) {
                ursData = jsonData;
                
                // Perform column mapping and show mapping results
                const mappingResult = performColumnMapping(jsonData);
                if (mappingResult.needsMapping) {
                    showColumnMappingInterface(jsonData, mappingResult);
                } else {
                    displayURSPreview();
                }
            } else {
                // Reset upload area on validation failure
                resetUploadArea();
            }
        } catch (error) {
            console.error('Excel processing error:', error);
            showProcessingError('Error reading Excel file: ' + error.message);
        }
    };
    
    reader.onerror = function(e) {
        console.error('FileReader error:', e);
        showProcessingError('Error reading file. Please try again.');
    };
    
    console.log('Starting to read file as binary string...');
    reader.readAsBinaryString(file);
}

function showProcessingError(message) {
    const uploadArea = document.getElementById('uploadArea');
    
    // Remove all existing event listeners from upload area
    const newUploadArea = uploadArea.cloneNode(false);
    uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
    
    newUploadArea.innerHTML = `
        <div class="text-center">
            <i class="fas fa-exclamation-circle fa-3x text-danger mb-3"></i>
            <h4 class="text-danger">Processing Error</h4>
            <p class="text-danger">${message}</p>
            <div class="mt-3">
                <button class="btn btn-primary" id="tryAgainBtn">
                    <i class="fas fa-upload"></i> Try Again
                </button>
                <button class="btn btn-outline-secondary ms-2" id="showDebugBtn">
                    <i class="fas fa-bug"></i> Show Debug Info
                </button>
            </div>
        </div>
    `;
    
    // Add specific event listeners
    document.getElementById('tryAgainBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        resetToUpload();
    });
    
    document.getElementById('showDebugBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDebug();
    });
}

function validateURS(data) {
    console.log('Validating URS data...');
    
    if (data.length === 0) {
        console.error('Empty data');
        showValidationError('The Excel file appears to be empty.', 'Please ensure your file contains data rows.');
        return false;
    }
    
    console.log('Data has', data.length, 'rows');
    
    const firstRow = data[0];
    const availableColumns = Object.keys(firstRow);
    console.log('Available columns:', availableColumns);
    
    // Always return true - we'll handle column mapping in the processing
    console.log('Validation passed - allowing flexible column mapping');
    return true;
}

function performColumnMapping(data) {
    const requiredColumns = [
        'Requirement ID',
        'Requirement Type', 
        'Link to process',
        'Requirement Description',
        'Comment',
        'Requirement Active?'
    ];
    
    const availableColumns = Object.keys(data[0] || {});
    const mapping = {};
    const unmappedRequired = [];
    let needsMapping = false;
    
    // Try to auto-map columns based on similarity
    requiredColumns.forEach(reqCol => {
        let mapped = false;
        
        // First, try exact match (case-insensitive)
        const exactMatch = availableColumns.find(col => 
            col.toLowerCase().trim() === reqCol.toLowerCase().trim()
        );
        
        if (exactMatch) {
            mapping[reqCol] = exactMatch;
            mapped = true;
        } else {
            // Try partial matching with keywords
            const match = findBestColumnMatch(reqCol, availableColumns);
            if (match) {
                mapping[reqCol] = match;
                mapped = true;
                needsMapping = true; // Mark that we made assumptions
            }
        }
        
        if (!mapped) {
            unmappedRequired.push(reqCol);
            needsMapping = true;
        }
    });
    
    return {
        mapping,
        unmappedRequired,
        availableColumns,
        needsMapping
    };
}

function findBestColumnMatch(requiredCol, availableColumns) {
    const reqLower = requiredCol.toLowerCase();
    
    // Define keyword mappings for intelligent matching
    const keywordMappings = {
        'requirement id': ['id', 'req_id', 'reqid', 'requirement_id', 'req id', 'number', 'no'],
        'requirement type': ['type', 'req_type', 'reqtype', 'category', 'kind'],
        'link to process': ['process', 'link', 'workflow', 'procedure', 'step'],
        'requirement description': ['description', 'desc', 'details', 'requirement', 'text', 'summary'],
        'comment': ['comment', 'comments', 'note', 'notes', 'remark', 'remarks'],
        'requirement active?': ['active', 'status', 'enabled', 'valid', 'current', 'state']
    };
    
    const keywords = keywordMappings[reqLower] || [];
    
    // Find best match based on keywords
    for (const keyword of keywords) {
        const match = availableColumns.find(col => 
            col.toLowerCase().includes(keyword)
        );
        if (match) {
            return match;
        }
    }
    
    return null;
}

function showColumnMappingInterface(data, mappingResult) {
    const uploadArea = document.getElementById('uploadArea');
    
    // Remove all existing event listeners from upload area
    const newUploadArea = uploadArea.cloneNode(false);
    uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
    
    const mappedColumns = Object.entries(mappingResult.mapping)
        .map(([req, avail]) => `<li><strong>${req}</strong> → <em>${avail}</em></li>`)
        .join('');
    
    const unmappedColumns = mappingResult.unmappedRequired
        .map(col => `<li class="text-warning">${col} (will use default values)</li>`)
        .join('');
    
    newUploadArea.innerHTML = `
        <div class="text-center">
            <i class="fas fa-exchange-alt fa-3x text-info mb-3"></i>
            <h4 class="text-info">Column Mapping Detected</h4>
            <p>Your Excel file has different column names. Here's how we'll map them:</p>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <h6 class="text-success">Mapped Columns:</h6>
                    <ul class="list-unstyled text-start">
                        ${mappedColumns || '<li class="text-muted">None automatically mapped</li>'}
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6 class="text-warning">Missing Columns:</h6>
                    <ul class="list-unstyled text-start">
                        ${unmappedColumns || '<li class="text-success">All columns mapped!</li>'}
                    </ul>
                </div>
            </div>
            
            <div class="mt-3">
                <h6>Available Columns in Your File:</h6>
                <div class="d-flex flex-wrap justify-content-center gap-2 mt-2">
                    ${mappingResult.availableColumns.map(col => 
                        `<span class="badge bg-secondary">${col}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="mt-4">
                <button class="btn btn-success btn-lg" id="proceedMappingBtn">
                    <i class="fas fa-check"></i> Proceed with This Mapping
                </button>
                <button class="btn btn-outline-secondary ms-2" id="manualMappingBtn">
                    <i class="fas fa-cogs"></i> Manual Mapping
                </button>
                <button class="btn btn-outline-danger ms-2" id="tryDifferentFileBtn">
                    <i class="fas fa-times"></i> Try Different File
                </button>
            </div>
        </div>
    `;
    
    // Add specific event listeners to buttons only
    document.getElementById('proceedMappingBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        proceedWithMapping();
    });
    
    document.getElementById('manualMappingBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showManualMapping();
    });
    
    document.getElementById('tryDifferentFileBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        resetToUpload();
    });
    
    // Store mapping for later use
    window.currentMapping = mappingResult;
}

function proceedWithMapping() {
    console.log('Proceeding with mapping...');
    console.log('URS Data before mapping:', ursData.length, 'rows');
    console.log('Current mapping:', window.currentMapping);
    
    // Apply the column mapping to the data
    const mappedData = applyColumnMapping(ursData, window.currentMapping);
    ursData = mappedData;
    
    console.log('URS Data after mapping:', ursData.length, 'rows');
    console.log('Sample mapped data:', ursData[0]);
    
    displayURSPreview();
}

function applyColumnMapping(data, mappingResult) {
    const requiredColumns = [
        'Requirement ID',
        'Requirement Type', 
        'Link to process',
        'Requirement Description',
        'Comment',
        'Requirement Active?'
    ];
    
    return data.map((row, index) => {
        const mappedRow = {};
        
        requiredColumns.forEach(reqCol => {
            if (mappingResult.mapping[reqCol]) {
                // Use mapped column
                mappedRow[reqCol] = row[mappingResult.mapping[reqCol]] || '';
            } else {
                // Use default values for unmapped columns
                mappedRow[reqCol] = getDefaultValue(reqCol, index + 1);
            }
        });
        
        return mappedRow;
    });
}

function getDefaultValue(columnName, rowIndex) {
    const defaults = {
        'Requirement ID': `REQ-${String(rowIndex).padStart(3, '0')}`,
        'Requirement Type': 'Functional',
        'Link to process': 'N/A',
        'Requirement Description': 'Description not provided',
        'Comment': 'Auto-generated from incomplete data',
        'Requirement Active?': 'Yes'
    };
    
    return defaults[columnName] || '';
}

function showManualMapping() {
    const uploadArea = document.getElementById('uploadArea');
    
    // Remove all existing event listeners from upload area
    const newUploadArea = uploadArea.cloneNode(false);
    uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
    
    const availableColumns = window.currentMapping.availableColumns;
    const currentMapping = window.currentMapping.mapping;
    
    const requiredColumns = [
        'Requirement ID',
        'Requirement Type', 
        'Link to process',
        'Requirement Description',
        'Comment',
        'Requirement Active?'
    ];
    
    // Create dropdown options
    const createDropdownOptions = (selectedValue = '') => {
        let options = '<option value="">-- Use Default Value --</option>';
        availableColumns.forEach(col => {
            const selected = col === selectedValue ? 'selected' : '';
            options += `<option value="${col}" ${selected}>${col}</option>`;
        });
        return options;
    };
    
    const mappingRows = requiredColumns.map(reqCol => {
        const currentValue = currentMapping[reqCol] || '';
        return `
            <tr>
                <td><strong>${reqCol}</strong></td>
                <td>
                    <select class="form-select mapping-select" data-required="${reqCol}">
                        ${createDropdownOptions(currentValue)}
                    </select>
                </td>
                <td>
                    <small class="text-muted">${getColumnDescription(reqCol)}</small>
                </td>
            </tr>
        `;
    }).join('');
    
    newUploadArea.innerHTML = `
        <div class="manual-mapping-container">
            <div class="text-center mb-4">
                <i class="fas fa-cogs fa-3x text-primary mb-3"></i>
                <h4 class="text-primary">Manual Column Mapping</h4>
                <p class="text-muted">Map your Excel columns to the required URS fields</p>
            </div>
            
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th style="width: 30%;">Required URS Field</th>
                            <th style="width: 40%;">Map to Your Column</th>
                            <th style="width: 30%;">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mappingRows}
                    </tbody>
                </table>
            </div>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-info text-white">
                            <h6 class="mb-0"><i class="fas fa-columns"></i> Your Excel Columns</h6>
                        </div>
                        <div class="card-body">
                            <div class="d-flex flex-wrap gap-2">
                                ${availableColumns.map(col => 
                                    `<span class="badge bg-secondary">${col}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-warning text-dark">
                            <h6 class="mb-0"><i class="fas fa-info-circle"></i> Mapping Tips</h6>
                        </div>
                        <div class="card-body">
                            <ul class="small mb-0">
                                <li>Select "Use Default Value" if your Excel doesn't have that field</li>
                                <li>You can map multiple URS fields to the same Excel column</li>
                                <li>Unmapped fields will get auto-generated default values</li>
                                <li>Preview your mapping before proceeding</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-4">
                <button class="btn btn-success btn-lg me-2" id="applyMappingBtn">
                    <i class="fas fa-check"></i> Apply Mapping
                </button>
                <button class="btn btn-outline-info me-2" id="previewMappingBtn">
                    <i class="fas fa-eye"></i> Preview Mapping
                </button>
                <button class="btn btn-outline-primary me-2" id="quickAutoMapBtn">
                    <i class="fas fa-magic"></i> Smart Auto-Map
                </button>
                <button class="btn btn-outline-secondary me-2" id="resetMappingBtn">
                    <i class="fas fa-undo"></i> Reset to Auto
                </button>
                <button class="btn btn-outline-danger" id="cancelMappingBtn">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
            
            <div id="mappingPreview" class="mt-4" style="display: none;">
                <div class="card">
                    <div class="card-header bg-light">
                        <h6 class="mb-0"><i class="fas fa-eye"></i> Mapping Preview</h6>
                    </div>
                    <div class="card-body" id="previewContent">
                        <!-- Preview content will be inserted here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add specific event listeners to buttons only
    document.getElementById('applyMappingBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        applyManualMapping();
    });
    
    document.getElementById('previewMappingBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        previewManualMapping();
    });
    
    document.getElementById('quickAutoMapBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        quickAutoMap();
    });
    
    document.getElementById('resetMappingBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        resetManualMapping();
    });
    
    document.getElementById('cancelMappingBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        resetToUpload();
    });
    
    // Add event listeners for real-time preview on select changes
    document.querySelectorAll('.mapping-select').forEach(select => {
        select.addEventListener('change', updateMappingPreview);
    });
}

function getColumnDescription(columnName) {
    const descriptions = {
        'Requirement ID': 'Unique identifier for each requirement',
        'Requirement Type': 'Category of requirement (Functional, Security, etc.)',
        'Link to process': 'Associated business process or workflow',
        'Requirement Description': 'Detailed description of the requirement',
        'Comment': 'Additional notes or comments',
        'Requirement Active?': 'Whether the requirement is active (Yes/No)'
    };
    return descriptions[columnName] || '';
}

function updateMappingPreview() {
    const mappingPreview = document.getElementById('mappingPreview');
    const previewContent = document.getElementById('previewContent');
    
    if (!mappingPreview || !previewContent) return;
    
    const currentMapping = getCurrentManualMapping();
    
    // Check for duplicate mappings
    const usedColumns = Object.values(currentMapping).filter(col => col);
    const duplicateColumns = usedColumns.filter((col, index) => usedColumns.indexOf(col) !== index);
    
    let previewHTML = '';
    
    // Show warning for duplicates
    if (duplicateColumns.length > 0) {
        previewHTML += `
            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Warning:</strong> The following columns are mapped to multiple fields: 
                <strong>${[...new Set(duplicateColumns)].join(', ')}</strong>
                <br><small>This is allowed but may result in duplicate data.</small>
            </div>
        `;
    }
    
    previewHTML += '<div class="row">';
    
    // Show mapped columns
    const mappedEntries = Object.entries(currentMapping).filter(([_, excelCol]) => excelCol);
    const unmappedEntries = Object.entries(currentMapping).filter(([_, excelCol]) => !excelCol);
    
    previewHTML += '<div class="col-md-6">';
    previewHTML += `<h6 class="text-success"><i class="fas fa-link"></i> Mapped Fields (${mappedEntries.length}):</h6>`;
    if (mappedEntries.length > 0) {
        previewHTML += '<ul class="list-unstyled">';
        mappedEntries.forEach(([reqField, excelCol]) => {
            const isDuplicate = duplicateColumns.includes(excelCol);
            const warningIcon = isDuplicate ? '<i class="fas fa-exclamation-triangle text-warning ms-1"></i>' : '';
            previewHTML += `<li class="mb-1"><strong>${reqField}</strong> ← <span class="text-primary">${excelCol}</span>${warningIcon}</li>`;
        });
        previewHTML += '</ul>';
    } else {
        previewHTML += '<p class="text-muted"><em>No fields mapped</em></p>';
    }
    previewHTML += '</div>';
    
    // Show default fields
    previewHTML += '<div class="col-md-6">';
    previewHTML += `<h6 class="text-warning"><i class="fas fa-magic"></i> Default Values (${unmappedEntries.length}):</h6>`;
    if (unmappedEntries.length > 0) {
        previewHTML += '<ul class="list-unstyled">';
        unmappedEntries.forEach(([reqField, _]) => {
            const defaultValue = getDefaultValue(reqField, 1);
            previewHTML += `<li class="mb-1"><strong>${reqField}</strong> → <span class="text-muted fst-italic">${defaultValue}</span></li>`;
        });
        previewHTML += '</ul>';
    } else {
        previewHTML += '<p class="text-muted"><em>All fields mapped</em></p>';
    }
    previewHTML += '</div>';
    
    previewHTML += '</div>';
    
    // Show sample data preview
    if (mappedEntries.length > 0) {
        previewHTML += '<hr><h6><i class="fas fa-table"></i> Sample Data Preview:</h6>';
        const sampleData = generateSampleMappingPreview(currentMapping);
        previewHTML += `
            <div class="table-responsive">
                <table class="table table-sm table-bordered">
                    <thead class="table-light">
                        <tr>
                            ${Object.keys(currentMapping).map(field => `<th style="font-size: 0.8em;">${field}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${sampleData}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    previewContent.innerHTML = previewHTML;
    mappingPreview.style.display = 'block';
}

function generateSampleMappingPreview(mapping) {
    const firstRow = ursData[0] || {};
    let rowHTML = '<tr>';
    
    Object.entries(mapping).forEach(([reqField, excelCol]) => {
        let value;
        if (excelCol && firstRow[excelCol] !== undefined) {
            value = firstRow[excelCol];
        } else {
            value = getDefaultValue(reqField, 1);
        }
        
        // Truncate long values for preview
        const displayValue = String(value).length > 30 ? String(value).substring(0, 30) + '...' : value;
        const isDefault = !excelCol;
        const cellClass = isDefault ? 'text-muted fst-italic' : '';
        
        rowHTML += `<td class="${cellClass}" style="font-size: 0.8em;" title="${value}">${displayValue}</td>`;
    });
    
    rowHTML += '</tr>';
    return rowHTML;
}

function getCurrentManualMapping() {
    const mapping = {};
    document.querySelectorAll('.mapping-select').forEach(select => {
        const requiredField = select.getAttribute('data-required');
        const selectedColumn = select.value;
        mapping[requiredField] = selectedColumn;
    });
    return mapping;
}

function previewManualMapping() {
    updateMappingPreview();
    
    // Scroll to preview
    const previewElement = document.getElementById('mappingPreview');
    if (previewElement) {
        previewElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function applyManualMapping() {
    const newMapping = getCurrentManualMapping();
    
    // Update the global mapping object
    window.currentMapping.mapping = newMapping;
    
    // Apply the mapping and show preview
    const mappedData = applyColumnMapping(ursData, window.currentMapping);
    ursData = mappedData;
    
    // Show success message and proceed
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <div class="text-center">
            <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
            <h4 class="text-success">Manual Mapping Applied Successfully!</h4>
            <p class="text-muted">Your column mapping has been applied. Proceeding to data preview...</p>
        </div>
    `;
    
    // Show the preview after a short delay
    setTimeout(() => {
        displayURSPreview();
    }, 1500);
}

function resetManualMapping() {
    // Reset to automatic mapping
    const mappingResult = performColumnMapping(ursData);
    window.currentMapping = mappingResult;
    showColumnMappingInterface(ursData, mappingResult);
}

function quickAutoMap() {
    // Apply smart auto-mapping to the dropdowns
    const mappingResult = performColumnMapping(ursData);
    const autoMapping = mappingResult.mapping;
    
    // Update all select elements with the auto-mapping
    document.querySelectorAll('.mapping-select').forEach(select => {
        const requiredField = select.getAttribute('data-required');
        const autoMappedColumn = autoMapping[requiredField] || '';
        select.value = autoMappedColumn;
    });
    
    // Update the preview
    updateMappingPreview();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show mt-3';
    notification.innerHTML = `
        <i class="fas fa-magic"></i> Smart auto-mapping applied! 
        Review the mappings and click "Preview Mapping" to see the results.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.manual-mapping-container');
    container.insertBefore(notification, container.firstChild);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function showValidationError(mainMessage, detailMessage, requiredColumns = null) {
    const uploadArea = document.getElementById('uploadArea');
    
    // Remove all existing event listeners from upload area
    const newUploadArea = uploadArea.cloneNode(false);
    uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
    
    let columnsHtml = '';
    if (requiredColumns) {
        columnsHtml = `
            <div class="mt-3">
                <strong>Required columns (exact names):</strong>
                <ul class="list-unstyled mt-2">
                    ${requiredColumns.map(col => `<li><code>${col}</code></li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    newUploadArea.innerHTML = `
        <div class="text-center">
            <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
            <h4 class="text-danger">Validation Failed</h4>
            <p class="text-danger"><strong>${mainMessage}</strong></p>
            <p class="text-muted">${detailMessage}</p>
            ${columnsHtml}
            <button class="btn btn-primary mt-3" id="tryAnotherFileBtn">
                <i class="fas fa-upload"></i> Try Another File
            </button>
            <button class="btn btn-outline-info mt-3 ms-2" id="downloadSampleBtn">
                <i class="fas fa-download"></i> Download Sample
            </button>
        </div>
    `;
    
    // Add specific event listeners
    document.getElementById('tryAnotherFileBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        resetToUpload();
    });
    
    document.getElementById('downloadSampleBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        downloadSampleFile();
    });
}

function resetToUpload() {
    console.log('Resetting to upload state');
    
    // Clear file input if it exists
    const currentFileInput = document.getElementById('fileInput');
    if (currentFileInput) {
        currentFileInput.value = '';
    }
    
    // Reset global variables
    ursData = [];
    fsData = [];
    window.currentMapping = null;
    
    // Hide any visible sections
    const sections = ['ursPreview', 'fsResults', 'progressContainer'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // Reset upload area
    resetUploadArea();
}

function downloadSampleFile() {
    // Create a link to download the sample file
    const link = document.createElement('a');
    link.href = 'sample_urs.xlsx';
    link.download = 'sample_urs.xlsx';
    link.click();
}

function resetUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    
    // Remove all existing event listeners from upload area
    const newUploadArea = uploadArea.cloneNode(false);
    uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
    
    // Clear any stored mapping
    window.currentMapping = null;
    
    newUploadArea.innerHTML = `
        <i class="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
        <h4>Drop your URS Excel file here</h4>
        <p class="text-muted">or click to browse files</p>
        <div class="mt-2">
            <span class="badge bg-success">
                <i class="fas fa-check-circle"></i> Ready for any Excel format!
            </span>
        </div>
        <input type="file" id="fileInput" accept=".xlsx,.xls" class="d-none">
        <div class="mt-3">
            <small class="text-success">
                <i class="fas fa-check-circle"></i>
                <strong>Flexible Column Mapping:</strong> Works with any Excel format!
            </small>
            <br>
            <small class="text-muted">
                Preferred columns: Requirement ID, Requirement Type, Link to process, 
                Requirement Description, Comment, Requirement Active?
            </small>
        </div>
        <div class="mt-2">
            <small class="text-info">
                <i class="fas fa-lightbulb"></i> 
                Don't worry about exact column names - we'll map them automatically!
            </small>
        </div>
    `;
    
    // Re-initialize file input event listener
    const newFileInput = document.getElementById('fileInput');
    newFileInput.addEventListener('change', handleFileSelect);
    
    // Re-initialize upload area click listener - but only for the area, not buttons
    newUploadArea.addEventListener('click', function(e) {
        // Only trigger file input if clicking on the upload area itself, not buttons
        if (e.target === newUploadArea || e.target.closest('.upload-area') === newUploadArea) {
            console.log('Upload area clicked after reset');
            newFileInput.click();
        }
    });
    
    newUploadArea.addEventListener('dragover', handleDragOver);
    newUploadArea.addEventListener('dragleave', handleDragLeave);
    newUploadArea.addEventListener('drop', handleDrop);
}

function displayURSPreview() {
    console.log('Displaying URS preview...');
    console.log('URS data length:', ursData.length);
    
    const ursHeaders = document.getElementById('ursHeaders');
    const ursBody = document.getElementById('ursBody');
    const ursPreview = document.getElementById('ursPreview');
    
    console.log('Elements found:', {
        ursHeaders: !!ursHeaders,
        ursBody: !!ursBody,
        ursPreview: !!ursPreview
    });
    
    if (!ursHeaders || !ursBody || !ursPreview) {
        console.error('Required URS preview elements not found!');
        return;
    }
    
    // Clear existing content
    ursHeaders.innerHTML = '';
    ursBody.innerHTML = '';
    
    // Create headers - always use required column names
    const requiredHeaders = [
        'Requirement ID',
        'Requirement Type', 
        'Link to process',
        'Requirement Description',
        'Comment',
        'Requirement Active?'
    ];
    
    requiredHeaders.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        
        // Add indicator if this was mapped from a different column
        if (window.currentMapping && window.currentMapping.mapping[header] && 
            window.currentMapping.mapping[header] !== header) {
            const small = document.createElement('small');
            small.className = 'text-muted d-block';
            small.textContent = `(from: ${window.currentMapping.mapping[header]})`;
            th.appendChild(small);
        }
        
        ursHeaders.appendChild(th);
    });
    
    // Create rows (show first 10 for preview)
    const previewData = ursData.slice(0, 10);
    previewData.forEach(row => {
        const tr = document.createElement('tr');
        requiredHeaders.forEach(header => {
            const td = document.createElement('td');
            const value = row[header] || '';
            td.textContent = value;
            td.style.maxWidth = '200px';
            td.style.overflow = 'hidden';
            td.style.textOverflow = 'ellipsis';
            td.style.whiteSpace = 'nowrap';
            td.title = value; // Show full text on hover
            
            // Add visual indicator for default values
            if (value.includes('Auto-generated') || value === 'N/A' || 
                value.startsWith('REQ-') && !window.currentMapping?.mapping[header]) {
                td.className = 'bg-light text-muted fst-italic';
            }
            
            tr.appendChild(td);
        });
        ursBody.appendChild(tr);
    });
    
    // Show preview section with mapping info
    ursPreview.style.display = 'block';
    console.log('URS Preview section displayed, generate button should be visible');
    
    // Add mapping summary if columns were mapped
    if (window.currentMapping && window.currentMapping.needsMapping) {
        const mappingSummary = document.createElement('div');
        mappingSummary.className = 'alert alert-info mt-3';
        mappingSummary.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <strong>Column Mapping Applied:</strong> 
            ${Object.keys(window.currentMapping.mapping).length} columns mapped, 
            ${window.currentMapping.unmappedRequired.length} columns using default values.
            <em>Italicized values</em> are auto-generated defaults.
        `;
        document.getElementById('ursPreview').appendChild(mappingSummary);
    }
}

function generateFunctionalSpecification() {
    console.log('=== GENERATE FS FUNCTION CALLED ===');
    console.log('URS Data length:', ursData ? ursData.length : 'ursData is null/undefined');
    console.log('AI Engine available:', !!aiEngine);
    console.log('AI Engine type:', typeof aiEngine);
    
    if (!ursData || ursData.length === 0) {
        console.error('No URS data available for processing');
        alert('No URS data available. Please upload a file first.');
        return;
    }
    
    console.log('Calling showProgress...');
    showProgress();
    
    console.log('Initializing fsData array...');
    fsData = [];
    const total = ursData.length;
    
    // Show AI status
    const aiStatus = aiEngine ? 'Advanced AI Analysis' : 'Rule-Based Processing';
    console.log('AI Status:', aiStatus);
    updateProgress(0, `Initializing ${aiStatus}...`);
    
    console.log('Starting URS processing loop for', total, 'items...');
    
    ursData.forEach((ursRow, index) => {
        console.log(`Processing item ${index + 1}/${total}:`, ursRow['Requirement ID']);
        
        setTimeout(() => {
            console.log(`Creating FS entry for ${ursRow['Requirement ID']}`);
            const fsEntry = createFSEntry(ursRow, index + 1);
            console.log(`Created FS entry:`, fsEntry['FS ID'], fsEntry['Feature/Function']);
            fsData.push(fsEntry);
            
            // Update progress with AI-specific messaging
            const progress = ((index + 1) / total) * 100;
            const message = aiEngine ? 
                `AI analyzing requirement ${index + 1} of ${total} (${fsEntry._aiAnalysis?.primaryIntent || 'processing'}...)` :
                `Processing requirement ${index + 1} of ${total}`;
            updateProgress(progress, message);
            
            console.log(`Progress: ${progress.toFixed(1)}% - ${message}`);
            
            // If last item, show results
            if (index === total - 1) {
                console.log('Processing complete, showing results in 500ms...');
                setTimeout(() => {
                    hideProgress();
                    displayFSResults();
                }, 500);
            }
        }, index * 150); // Slightly longer delay to show AI processing
    });
}

function createFSEntry(ursRow, fsIndex) {
    console.log(`Creating FS entry ${fsIndex} for:`, ursRow['Requirement ID']);
    console.log('URS Row data:', ursRow);
    
    // Use AI engine if available, otherwise fall back to rule-based logic
    if (aiEngine) {
        console.log(`Using AI engine for requirement ${fsIndex}`);
        try {
            const result = aiEngine.transformURSToFS(ursRow, fsIndex);
            console.log(`AI transformation result:`, result);
            return result;
        } catch (error) {
            console.error(`AI transformation failed for ${fsIndex}:`, error);
            console.log('Falling back to rule-based logic');
            return createFallbackFSEntry(ursRow, fsIndex);
        }
    } else {
        console.log(`Using fallback logic for requirement ${fsIndex}`);
        return createFallbackFSEntry(ursRow, fsIndex);
    }
}

function createFallbackFSEntry(ursRow, fsIndex) {
    const reqType = (ursRow['Requirement Type'] || '').toLowerCase();
    const reqDesc = ursRow['Requirement Description'] || '';
    
    // Generate FS ID
    const fsId = `FS-${String(fsIndex).padStart(3, '0')}`;
    
    // Generate Feature/Function based on requirement type
    const feature = generateFeatureFunction(reqType, reqDesc);
    
    // Generate enhanced description
    const description = generateEnhancedDescription(reqDesc, reqType);
    
    // Generate intelligent comments
    const comments = generateIntelligentComments(ursRow);
    
    return {
        'FS ID': fsId,
        'Reference URS ID': ursRow['Requirement ID'],
        'Feature/Function': feature,
        'Description': description,
        'Comments': comments,
        'Requirement Active?': ursRow['Requirement Active?']
    };
}

function generateFeatureFunction(reqType, reqDesc) {
    // Analyze requirement description for keywords
    const descLower = reqDesc.toLowerCase();
    
    // Check for specific functionality keywords
    if (descLower.includes('login') || descLower.includes('authentication')) {
        return 'User Authentication Module';
    }
    if (descLower.includes('report') || descLower.includes('dashboard')) {
        return 'Reporting and Analytics Dashboard';
    }
    if (descLower.includes('search') || descLower.includes('filter')) {
        return 'Advanced Search and Filter System';
    }
    if (descLower.includes('notification') || descLower.includes('alert')) {
        return 'Notification Management System';
    }
    if (descLower.includes('backup') || descLower.includes('restore')) {
        return 'Data Backup and Recovery Module';
    }
    if (descLower.includes('export') || descLower.includes('import')) {
        return 'Data Import/Export Functionality';
    }
    if (descLower.includes('validation') || descLower.includes('verify')) {
        return 'Data Validation Framework';
    }
    if (descLower.includes('configuration') || descLower.includes('setting')) {
        return 'System Configuration Interface';
    }
    
    // Use template based on requirement type
    const templates = featureTemplates[reqType] || featureTemplates['default'];
    const randomIndex = Math.floor(Math.random() * templates.length);
    
    return templates[randomIndex];
}

function generateEnhancedDescription(originalDesc, reqType) {
    if (!originalDesc) return 'Functional specification to be defined';
    
    let enhanced = originalDesc;
    
    // Add technical implementation details based on requirement type
    switch (reqType) {
        case 'functional':
            enhanced = `This functional requirement specifies that ${enhanced.toLowerCase()}. The implementation shall include proper error handling, data validation, and user feedback mechanisms.`;
            break;
        case 'non-functional':
            enhanced = `This non-functional requirement defines performance criteria where ${enhanced.toLowerCase()}. The system must meet specified benchmarks for response time, throughput, and resource utilization.`;
            break;
        case 'interface':
            enhanced = `This interface requirement establishes that ${enhanced.toLowerCase()}. The implementation shall ensure secure data exchange, proper protocol adherence, and error recovery procedures.`;
            break;
        case 'security':
            enhanced = `This security requirement mandates that ${enhanced.toLowerCase()}. The implementation must incorporate encryption, access controls, and audit logging capabilities.`;
            break;
        default:
            // Enhance with action words
            for (const [trigger, enhancement] of Object.entries(descriptionEnhancements)) {
                if (enhanced.toLowerCase().includes(trigger)) {
                    enhanced = enhanced.replace(new RegExp(trigger, 'gi'), enhancement);
                    break;
                }
            }
    }
    
    // Ensure proper length (truncate if too long)
    if (enhanced.length > 500) {
        enhanced = enhanced.substring(0, 497) + '...';
    }
    
    return enhanced;
}

function generateIntelligentComments(ursRow) {
    const comments = [];
    
    // Add original comment if exists
    if (ursRow['Comment'] && ursRow['Comment'].trim()) {
        comments.push(`Original: ${ursRow['Comment']}`);
    }
    
    // Add implementation notes based on requirement type
    const reqType = (ursRow['Requirement Type'] || '').toLowerCase();
    switch (reqType) {
        case 'functional':
            comments.push('Implementation: Requires UI components and business logic validation');
            break;
        case 'non-functional':
            comments.push('Implementation: Requires performance monitoring and optimization');
            break;
        case 'interface':
            comments.push('Implementation: Requires API design and integration testing');
            break;
        case 'security':
            comments.push('Implementation: Requires security testing and compliance validation');
            break;
    }
    
    // Add priority assessment
    const isActive = ursRow['Requirement Active?'];
    if (isActive && isActive.toString().toLowerCase() === 'yes') {
        comments.push('Priority: High - Active requirement');
    } else {
        comments.push('Priority: Low - Inactive requirement');
    }
    
    return comments.join('; ');
}

function displayFSResults() {
    console.log('Displaying FS results...', fsData.length, 'entries');
    
    if (fsData.length === 0) {
        console.error('No FS data to display');
        alert('No FS data was generated. Please try again.');
        return;
    }
    
    const fsBody = document.getElementById('fsBody');
    const fsResults = document.getElementById('fsResults');
    const fsSummary = document.getElementById('fsSummary');
    
    if (!fsBody || !fsResults) {
        console.error('FS display elements not found');
        return;
    }
    
    // Clear existing content
    fsBody.innerHTML = '';
    
    // Populate the FS table
    fsData.forEach(fsEntry => {
        const tr = document.createElement('tr');
        
        // FS ID
        const tdId = document.createElement('td');
        tdId.textContent = fsEntry['FS ID'];
        tdId.className = 'fw-bold text-primary';
        tr.appendChild(tdId);
        
        // Reference URS ID
        const tdRef = document.createElement('td');
        tdRef.textContent = fsEntry['Reference URS ID'];
        tr.appendChild(tdRef);
        
        // Feature/Function
        const tdFeature = document.createElement('td');
        tdFeature.innerHTML = `<span class="feature-badge">${fsEntry['Feature/Function']}</span>`;
        tr.appendChild(tdFeature);
        
        // Description
        const tdDesc = document.createElement('td');
        tdDesc.textContent = fsEntry['Description'];
        tdDesc.style.maxWidth = '300px';
        tdDesc.style.wordWrap = 'break-word';
        tr.appendChild(tdDesc);
        
        // Comments
        const tdComments = document.createElement('td');
        tdComments.textContent = fsEntry['Comments'];
        tr.appendChild(tdComments);
        
        // Requirement Active
        const tdActive = document.createElement('td');
        const activeValue = fsEntry['Requirement Active?'];
        tdActive.textContent = activeValue;
        if (activeValue === 'Yes' || activeValue === 'Y') {
            tdActive.className = 'text-success fw-bold';
        } else if (activeValue === 'No' || activeValue === 'N') {
            tdActive.className = 'text-danger fw-bold';
        }
        tr.appendChild(tdActive);
        
        fsBody.appendChild(tr);
    });
    
    // Update summary
    if (fsSummary) {
        const aiGenerated = fsData.filter(entry => entry._aiAnalysis).length;
        const totalEntries = fsData.length;
        
        let summaryText = `${totalEntries} functional specifications generated.`;
        if (aiGenerated > 0) {
            summaryText += ` ${aiGenerated} entries enhanced with AI analysis.`;
        }
        fsSummary.textContent = summaryText;
    }
    
    // Show the results section
    fsResults.style.display = 'block';
    
    // Scroll to results
    fsResults.scrollIntoView({ behavior: 'smooth' });
    
    console.log('FS results displayed successfully');
}

function showProgress() {
    console.log('Showing progress...');
    const progressContainer = document.getElementById('progressContainer');
    if (progressContainer) {
        progressContainer.style.display = 'block';
        updateProgress(0, 'Initializing...');
    }
}

function hideProgress() {
    console.log('Hiding progress...');
    const progressContainer = document.getElementById('progressContainer');
    if (progressContainer) {
        progressContainer.style.display = 'none';
    }
}

function updateProgress(percentage, message) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    
    if (progressBar) {
        progressBar.style.width = percentage + '%';
        progressBar.setAttribute('aria-valuenow', percentage);
    }
    
    if (progressText) {
        progressText.textContent = message || 'Processing...';
    }
    
    if (progressPercent) {
        progressPercent.textContent = Math.round(percentage) + '%';
    }
}

// Debug functions
function toggleDebug() {
    const panel = document.getElementById('debugPanel');
    const isHidden = panel.style.display === 'none';
    panel.style.display = isHidden ? 'block' : 'none';
    
    if (isHidden) {
        updateDebugInfo();
    }
}

function updateDebugInfo() {
    // Library status
    const libraryStatus = document.getElementById('libraryStatus');
    if (typeof XLSX !== 'undefined') {
        libraryStatus.innerHTML = '<span class="text-success">✅ XLSX library loaded (v' + (XLSX.version || 'unknown') + ')</span>';
    } else {
        libraryStatus.innerHTML = '<span class="text-danger">❌ XLSX library not loaded</span>';
    }
    
    // Browser info
    const browserInfo = document.getElementById('browserInfo');
    browserInfo.textContent = navigator.userAgent.substring(0, 80) + '...';
    
    // File support
    const fileSupport = document.getElementById('fileSupport');
    const hasFileReader = typeof FileReader !== 'undefined';
    const hasFileAPI = !!(window.File && window.FileReader && window.FileList && window.Blob);
    
    if (hasFileReader && hasFileAPI) {
        fileSupport.innerHTML = '<span class="text-success">✅ File API supported</span>';
    } else {
        fileSupport.innerHTML = '<span class="text-danger">❌ File API not supported</span>';
    }
}

// Debug function to test FS generation
function testFSGeneration() {
    console.log('=== TESTING FS GENERATION ===');
    
    // Sample URS data for testing
    const testURS = [
        {
            'Requirement ID': 'URS-001',
            'Requirement Type': 'Functional',
            'Link to process': 'User Management',
            'Requirement Description': 'The system shall allow users to login with username and password.',
            'Comment': 'Critical security requirement',
            'Requirement Active?': 'Yes'
        },
        {
            'Requirement ID': 'URS-002',
            'Requirement Type': 'Functional',
            'Link to process': 'Search',
            'Requirement Description': 'Users shall be able to search for customer records using multiple criteria.',
            'Comment': 'Enhanced search capability',
            'Requirement Active?': 'Yes'
        },
        {
            'Requirement ID': 'URS-003',
            'Requirement Type': 'Functional',
            'Link to process': 'Reporting',
            'Requirement Description': 'The application must generate monthly sales reports in Excel format and email them automatically.',
            'Comment': 'Automated reporting feature',
            'Requirement Active?': 'Yes'
        }
    ];
    
    // Set test data
    ursData = testURS;
    console.log('Test URS data set:', ursData.length, 'items');
    
    // Set up a mock mapping (as if all columns were mapped correctly)
    window.currentMapping = {
        mapping: {
            'Requirement ID': 'Requirement ID',
            'Requirement Type': 'Requirement Type',
            'Link to process': 'Link to process',
            'Requirement Description': 'Requirement Description',
            'Comment': 'Comment',
            'Requirement Active?': 'Requirement Active?'
        },
        needsMapping: false,
        unmappedRequired: [],
        availableColumns: ['Requirement ID', 'Requirement Type', 'Link to process', 'Requirement Description', 'Comment', 'Requirement Active?']
    };
    
    // Show URS preview
    displayURSPreview();
    
    console.log('URS preview displayed');
    
    // Directly call FS generation after a short delay
    setTimeout(() => {
        console.log('Calling generateFunctionalSpecification directly...');
        generateFunctionalSpecification();
    }, 500);
}

// Debug function to check if Generate FS button is working
function checkGenerateButton() {
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        console.log('Generate button found, clicking it...');
        generateBtn.click();
    } else {
        console.log('Generate button not found - URS preview not visible');
    }
}

// Add to window for console access
window.testFSGeneration = testFSGeneration;
window.checkGenerateButton = checkGenerateButton;

function downloadFSExcel() {
    console.log('Download FS Excel clicked');
    
    if (!fsData || fsData.length === 0) {
        console.error('No FS data available for download');
        alert('No FS data available. Please generate the functional specification first.');
        return;
    }
    
    try {
        console.log('Creating Excel workbook with', fsData.length, 'FS entries');
        
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        
        // Prepare data for Excel
        const excelData = fsData.map(entry => ({
            'FS ID': entry['FS ID'],
            'Reference URS ID': entry['Reference URS ID'],
            'Feature/Function': entry['Feature/Function'],
            'Description': entry['Description'],
            'Comments': entry['Comments'],
            'Requirement Active?': entry['Requirement Active?']
        }));
        
        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(excelData);
        
        // Set column widths for better formatting
        const colWidths = [
            { wch: 12 },  // FS ID
            { wch: 15 },  // Reference URS ID
            { wch: 25 },  // Feature/Function
            { wch: 50 },  // Description
            { wch: 30 },  // Comments
            { wch: 15 }   // Requirement Active?
        ];
        ws['!cols'] = colWidths;
        
        // Enable word wrap for description columns
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let row = range.s.r; row <= range.e.r; row++) {
            for (let col = range.s.c; col <= range.e.c; col++) {
                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                if (!ws[cellAddress]) continue;
                
                // Set word wrap and alignment
                if (!ws[cellAddress].s) ws[cellAddress].s = {};
                ws[cellAddress].s.alignment = {
                    wrapText: true,
                    vertical: 'top'
                };
                
                // Special formatting for description column (index 3)
                if (col === 3) {
                    ws[cellAddress].s.alignment.horizontal = 'left';
                }
            }
        }
        
        // Add the worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Functional Specification');
        
        // Generate filename with timestamp
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
        const filename = `Functional_Specification_${timestamp}.xlsx`;
        
        // Write file
        XLSX.writeFile(wb, filename);
        
        console.log('Excel file downloaded successfully:', filename);
        
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            <i class="fas fa-download"></i>
            <strong>Download Complete!</strong><br>
            <small>File: ${filename}</small>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
    } catch (error) {
        console.error('Error creating Excel file:', error);
        alert('Error creating Excel file: ' + error.message);
    }
}
