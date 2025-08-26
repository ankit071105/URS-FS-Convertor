// Advanced AI-like text processing for URS to FS transformation
class URSToFSAI {
    constructor() {
        this.requirementPatterns = this.initializePatterns();
        this.functionalTemplates = this.initializeFunctionalTemplates();
        this.technicalVocabulary = this.initializeTechnicalVocabulary();
    }

    initializePatterns() {
        return {
            // Intent detection patterns
            authentication: /\b(login|authenticate|sign[- ]?in|credentials|password|username|access control)\b/gi,
            authorization: /\b(permission|role|access level|privilege|rights|authorize)\b/gi,
            dataProcessing: /\b(process|calculate|compute|transform|convert|validate|parse)\b/gi,
            reporting: /\b(report|dashboard|analytics|chart|graph|export|print)\b/gi,
            search: /\b(search|filter|find|query|lookup|retrieve)\b/gi,
            notification: /\b(notify|alert|email|message|notification|inform)\b/gi,
            integration: /\b(integrate|API|interface|connect|external|third[- ]?party)\b/gi,
            storage: /\b(store|save|database|persist|backup|archive)\b/gi,
            security: /\b(encrypt|secure|protect|firewall|SSL|TLS|hash)\b/gi,
            performance: /\b(fast|quick|speed|response time|performance|optimize)\b/gi,
            userInterface: /\b(UI|interface|screen|form|button|menu|display)\b/gi,
            workflow: /\b(workflow|process|step|approval|review|routing)\b/gi,
            
            // Action verbs for transformation
            actionVerbs: /\b(shall|must|should|will|can|may|need to|required to|able to)\b/gi,
            
            // Technical complexity indicators
            simple: /\b(simple|basic|straightforward|easy)\b/gi,
            complex: /\b(complex|advanced|sophisticated|multi[- ]?step)\b/gi,
            realTime: /\b(real[- ]?time|instant|immediate|live)\b/gi,
            batch: /\b(batch|scheduled|periodic|bulk)\b/gi
        };
    }

    initializeFunctionalTemplates() {
        return {
            authentication: {
                features: ['Login', 'Authentication', 'Verification', 'Access', 'Security'],
                descriptions: [
                    'User access validation',
                    'Secure login system',
                    'Identity verification',
                    'Access control mechanism'
                ]
            },
            authorization: {
                features: ['Permissions', 'Access', 'Rights', 'Control', 'Authorization'],
                descriptions: [
                    'Role-based access control',
                    'Permission management',
                    'User privilege system',
                    'Rights administration'
                ]
            },
            dataProcessing: {
                features: ['Processing', 'Calculation', 'Transformation', 'Validation', 'Computation'],
                descriptions: [
                    'Data processing engine',
                    'Business calculation system',
                    'Data transformation logic',
                    'Information validation'
                ]
            },
            reporting: {
                features: ['Reports', 'Analytics', 'Dashboard', 'Export', 'Visualization'],
                descriptions: [
                    'Business reporting system',
                    'Analytics dashboard',
                    'Report generation',
                    'Data visualization'
                ]
            },
            search: {
                features: ['Search', 'Filtering', 'Lookup', 'Query', 'Discovery'],
                descriptions: [
                    'Advanced search capability',
                    'Data filtering system',
                    'Information lookup',
                    'Query processing'
                ]
            },
            notification: {
                features: ['Notifications', 'Alerts', 'Messaging', 'Communication', 'Updates'],
                descriptions: [
                    'Notification system',
                    'Alert mechanism',
                    'Message delivery',
                    'Communication platform'
                ]
            },
            integration: {
                features: ['Integration', 'Interface', 'Connectivity', 'Exchange', 'Synchronization'],
                descriptions: [
                    'System integration',
                    'API interface',
                    'Data exchange',
                    'External connectivity'
                ]
            },
            storage: {
                features: ['Storage', 'Database', 'Repository', 'Archive', 'Backup'],
                descriptions: [
                    'Data storage system',
                    'Database management',
                    'Information repository',
                    'Backup solution'
                ]
            },
            security: {
                features: ['Security', 'Encryption', 'Protection', 'Compliance', 'Monitoring'],
                descriptions: [
                    'Security framework',
                    'Data encryption',
                    'Information protection',
                    'Compliance monitoring'
                ]
            },
            userInterface: {
                features: ['Interface', 'Dashboard', 'Portal', 'Console', 'Workspace'],
                descriptions: [
                    'User interface system',
                    'Interactive dashboard',
                    'User portal',
                    'Management console'
                ]
            },
            workflow: {
                features: ['Workflow', 'Process', 'Automation', 'Routing', 'Approval'],
                descriptions: [
                    'Business workflow',
                    'Process automation',
                    'Task routing',
                    'Approval system'
                ]
            }
        };
    }

    initializeTechnicalVocabulary() {
        return {
            complexity: {
                simple: ['streamlined', 'efficient', 'user-friendly', 'intuitive'],
                moderate: ['comprehensive', 'robust', 'flexible', 'scalable'],
                complex: ['sophisticated', 'enterprise-grade', 'advanced', 'multi-layered']
            },
            performance: {
                fast: ['high-performance', 'optimized', 'real-time', 'responsive'],
                standard: ['reliable', 'consistent', 'stable', 'efficient'],
                batch: ['scheduled', 'batch-processed', 'queued', 'asynchronous']
            },
            integration: {
                internal: ['integrated', 'seamless', 'unified', 'centralized'],
                external: ['connected', 'interfaced', 'federated', 'distributed']
            }
        };
    }

    analyzeRequirement(ursRow) {
        const description = (ursRow['Requirement Description'] || '').toLowerCase();
        const type = (ursRow['Requirement Type'] || '').toLowerCase();
        const comment = (ursRow['Comment'] || '').toLowerCase();
        
        const fullText = `${description} ${type} ${comment}`;
        
        return {
            primaryIntent: this.detectPrimaryIntent(fullText),
            secondaryIntents: this.detectSecondaryIntents(fullText),
            complexity: this.assessComplexity(fullText),
            priority: this.assessPriority(ursRow),
            technicalRequirements: this.extractTechnicalRequirements(fullText),
            businessValue: this.assessBusinessValue(fullText),
            userImpact: this.assessUserImpact(fullText)
        };
    }

    detectPrimaryIntent(text) {
        const intentScores = {};
        
        for (const [intent, pattern] of Object.entries(this.requirementPatterns)) {
            if (intent === 'actionVerbs' || intent === 'simple' || intent === 'complex' || intent === 'realTime' || intent === 'batch') {
                continue;
            }
            
            const matches = text.match(pattern) || [];
            intentScores[intent] = matches.length;
        }
        
        const primaryIntent = Object.keys(intentScores).reduce((a, b) => 
            intentScores[a] > intentScores[b] ? a : b
        );
        
        return intentScores[primaryIntent] > 0 ? primaryIntent : 'dataProcessing';
    }

    detectSecondaryIntents(text) {
        const intentScores = {};
        
        for (const [intent, pattern] of Object.entries(this.requirementPatterns)) {
            if (intent === 'actionVerbs' || intent === 'simple' || intent === 'complex' || intent === 'realTime' || intent === 'batch') {
                continue;
            }
            
            const matches = text.match(pattern) || [];
            if (matches.length > 0) {
                intentScores[intent] = matches.length;
            }
        }
        
        return Object.keys(intentScores)
            .sort((a, b) => intentScores[b] - intentScores[a])
            .slice(1, 3);
    }

    assessComplexity(text) {
        const complexIndicators = (text.match(this.requirementPatterns.complex) || []).length;
        const simpleIndicators = (text.match(this.requirementPatterns.simple) || []).length;
        const realTimeIndicators = (text.match(this.requirementPatterns.realTime) || []).length;
        
        if (complexIndicators > 0 || realTimeIndicators > 1) {
            return 'complex';
        } else if (simpleIndicators > 0) {
            return 'simple';
        } else {
            return 'moderate';
        }
    }

    assessPriority(ursRow) {
        const priority = (ursRow['Priority'] || '').toLowerCase();
        const description = (ursRow['Requirement Description'] || '').toLowerCase();
        
        if (priority.includes('high') || priority.includes('critical') || priority.includes('urgent')) {
            return 'high';
        } else if (priority.includes('low') || description.includes('nice to have') || description.includes('optional')) {
            return 'low';
        } else {
            return 'medium';
        }
    }

    extractTechnicalRequirements(text) {
        const requirements = [];
        
        if (this.requirementPatterns.security.test(text)) {
            requirements.push('Security compliance');
        }
        if (this.requirementPatterns.performance.test(text)) {
            requirements.push('Performance optimization');
        }
        if (this.requirementPatterns.integration.test(text)) {
            requirements.push('System integration');
        }
        if (this.requirementPatterns.realTime.test(text)) {
            requirements.push('Real-time processing');
        }
        
        return requirements;
    }

    assessBusinessValue(text) {
        const highValueIndicators = /\b(critical|essential|core|primary|key|strategic|important)\b/gi;
        const lowValueIndicators = /\b(nice to have|optional|minor|secondary|convenience)\b/gi;
        
        const highMatches = (text.match(highValueIndicators) || []).length;
        const lowMatches = (text.match(lowValueIndicators) || []).length;
        
        if (highMatches > lowMatches && highMatches > 0) {
            return 'high';
        } else if (lowMatches > 0) {
            return 'low';
        } else {
            return 'medium';
        }
    }

    assessUserImpact(text) {
        const highImpactIndicators = /\b(user experience|efficiency|productivity|workflow|daily|frequent)\b/gi;
        const lowImpactIndicators = /\b(admin|administrative|backend|internal|system)\b/gi;
        
        const highMatches = (text.match(highImpactIndicators) || []).length;
        const lowMatches = (text.match(lowImpactIndicators) || []).length;
        
        if (highMatches > lowMatches && highMatches > 0) {
            return 'high';
        } else if (lowMatches > 0) {
            return 'low';
        } else {
            return 'medium';
        }
    }

    generateFeatureFunction(analysis, ursRow) {
        const ursDescription = (ursRow['Requirement Description'] || '').toLowerCase();
        
        // Generate human-like feature names based on what the requirement actually does
        const humanFeatures = this.extractHumanFeatureName(ursDescription, analysis);
        
        return humanFeatures;
    }

    extractHumanFeatureName(description, analysis) {
        // Human-like feature name patterns based on actual requirement content
        const featurePatterns = {
            // Login/Authentication
            'login|log in|sign in|authenticate': ['Login', 'SignIn', 'Access', 'Entry'],
            'password|credential|verification': ['Password', 'Credentials', 'Verification', 'Security'],
            
            // User management
            'user.*creat|add.*user|register': ['Registration', 'Enrollment', 'Signup'],
            'user.*manag|edit.*user|update.*user': ['UserManagement', 'Profile', 'Account'],
            
            // Data operations
            'save|store|persist': ['Save', 'Storage', 'Persistence'],
            'search|find|lookup': ['Search', 'Finder', 'Lookup'],
            'filter|sort|order': ['Filter', 'Sorting', 'Organization'],
            'export|download|extract': ['Export', 'Download', 'Extraction'],
            'import|upload|load': ['Import', 'Upload', 'Loading'],
            'delete|remove|purge': ['Delete', 'Removal', 'Cleanup'],
            'edit|modify|update|change': ['Edit', 'Update', 'Modification'],
            'view|display|show|present': ['View', 'Display', 'Presentation'],
            
            // Business processes
            'calculat|comput|process': ['Calculator', 'Processor', 'Engine'],
            'validat|check|verify': ['Validator', 'Checker', 'Verification'],
            'generat.*report|report.*generat': ['ReportGenerator', 'Reports', 'Analytics'],
            'approv|review|confirm': ['Approval', 'Review', 'Confirmation'],
            'assign|allocat|distribut': ['Assignment', 'Allocation', 'Distribution'],
            'track|monitor|watch': ['Tracker', 'Monitor', 'Surveillance'],
            
            // Communication
            'notif|alert|inform': ['Notifications', 'Alerts', 'Messaging'],
            'email|mail|send.*message': ['Email', 'Messaging', 'Communication'],
            'remind|schedul.*notif': ['Reminders', 'Scheduler', 'Alerts'],
            
            // Integration
            'integrat|connect|link': ['Integration', 'Connector', 'Bridge'],
            'sync|synchroniz': ['Sync', 'Synchronizer', 'Harmony'],
            'api|interface|endpoint': ['API', 'Interface', 'Gateway'],
            
            // Dashboard/UI
            'dashboard|summary|overview': ['Dashboard', 'Overview', 'Summary'],
            'menu|navigat|browse': ['Navigation', 'Menu', 'Browser'],
            'form|input|entry': ['Forms', 'Input', 'DataEntry'],
            'chart|graph|visual': ['Charts', 'Visualization', 'Graphics'],
            
            // Workflow
            'workflow|process|flow': ['Workflow', 'Process', 'Pipeline'],
            'automat|schedul': ['Automation', 'Scheduler', 'Robot'],
            'queue|batch|bulk': ['Queue', 'BatchProcessor', 'BulkHandler']
        };
        
        // Find matching pattern and select appropriate feature name
        for (const [pattern, features] of Object.entries(featurePatterns)) {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(description)) {
                // Select feature based on complexity
                if (analysis.complexity === 'complex') {
                    return features[features.length - 1]; // More sophisticated name
                } else if (analysis.complexity === 'simple') {
                    return features[0]; // Simple name
                } else {
                    return features[Math.floor(features.length / 2)]; // Middle option
                }
            }
        }
        
        // Fallback: Generate from requirement type or intent
        return this.generateFallbackFeatureName(analysis);
    }

    generateFallbackFeatureName(analysis) {
        const intentFeatures = {
            'authentication': ['Login', 'Access', 'Security'],
            'authorization': ['Permissions', 'Access', 'Rights'],
            'dataProcessing': ['Processor', 'Engine', 'Handler'],
            'reporting': ['Reports', 'Analytics', 'Dashboard'],
            'search': ['Search', 'Finder', 'Discovery'],
            'notification': ['Notifications', 'Alerts', 'Messaging'],
            'integration': ['Integration', 'Connector', 'Bridge'],
            'storage': ['Storage', 'Repository', 'Database'],
            'security': ['Security', 'Protection', 'Guard'],
            'userInterface': ['Interface', 'Portal', 'Console'],
            'workflow': ['Workflow', 'Process', 'Automation'],
            'performance': ['Optimizer', 'Accelerator', 'Booster']
        };
        
        const features = intentFeatures[analysis.primaryIntent] || ['Feature', 'System', 'Module'];
        return features[0];
    }

    generateGenericFeature(analysis, ursRow) {
        const type = (ursRow['Requirement Type'] || '').toLowerCase();
        const baseFeatures = {
            'functional': 'Process',
            'security': 'Security',
            'performance': 'Performance',
            'interface': 'Interface',
            'data': 'Database',
            'reporting': 'Reports',
            'integration': 'Integration',
            'workflow': 'Workflow'
        };
        
        // Return single word only
        return baseFeatures[type] || 'Feature';
    }

    generateEnhancedDescription(analysis, ursRow) {
        const ursDescription = ursRow['Requirement Description'] || '';
        
        // If no URS description, fall back to template-based
        if (!ursDescription.trim()) {
            return this.generateGenericDescription(analysis);
        }
        
        // Generate unique description directly based on the specific URS content
        const uniqueDescription = this.createUniqueContextualDescription(ursDescription, analysis, ursRow);
        
        // Add priority prefix for high-priority items
        if (analysis.priority === 'high') {
            return `Critical requirement for ${uniqueDescription.toLowerCase()}`;
        }
        
        return uniqueDescription;
    }

    createUniqueContextualDescription(ursDescription, analysis, ursRow) {
        // Generate cohesive description based on URS content
        let baseDescription = this.generateCohesiveDescription(ursDescription, analysis);
        
        // Make the description unique for this specific requirement
        const uniqueDescription = this.makeDescriptionUnique(baseDescription, ursDescription, ursRow);
        
        // Add colon structure for better readability
        const structuredDescription = this.addColonStructure(uniqueDescription, analysis);
        
        return structuredDescription;
    }

    addColonStructure(description, analysis) {
        // Add colons to create better structure in FS descriptions
        let structured = description;
        
        // Common patterns for adding colons
        const colonPatterns = [
            // Interface patterns
            { pattern: /^(.*interface.*?)(\s+(?:provides?|enables?|allows?|supports?|delivers?|manages?).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*system.*?)(\s+(?:provides?|enables?|allows?|supports?|delivers?|manages?).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*application.*?)(\s+(?:provides?|enables?|allows?|supports?|delivers?|manages?).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*platform.*?)(\s+(?:provides?|enables?|allows?|supports?|delivers?|manages?).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*service.*?)(\s+(?:provides?|enables?|allows?|supports?|delivers?|manages?).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*functionality.*?)(\s+(?:that|which|to).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*capability.*?)(\s+(?:that|which|to).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*mechanism.*?)(\s+(?:that|which|to).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*framework.*?)(\s+(?:that|which|to).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*engine.*?)(\s+(?:that|which|to).*)/i, replacement: '$1: $2' },
            
            // User/Business patterns
            { pattern: /^(User.*?)(\s+(?:can|may|will|shall|must).*)/i, replacement: '$1: $2' },
            { pattern: /^(Business.*?)(\s+(?:requires?|needs?|enables?).*)/i, replacement: '$1: $2' },
            { pattern: /^(Data.*?)(\s+(?:processing|management|handling).*)/i, replacement: '$1: $2' },
            { pattern: /^(Report.*?)(\s+(?:generation|creation|delivery).*)/i, replacement: '$1: $2' },
            { pattern: /^(Security.*?)(\s+(?:framework|protocol|measures?).*)/i, replacement: '$1: $2' },
            
            // Process patterns
            { pattern: /^(.*processing.*?)(\s+(?:includes?|involves?|encompasses?).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*management.*?)(\s+(?:includes?|involves?|encompasses?).*)/i, replacement: '$1: $2' },
            { pattern: /^(.*workflow.*?)(\s+(?:includes?|involves?|encompasses?).*)/i, replacement: '$1: $2' },
            
            // Generic patterns for any description that doesn't have structure
            { pattern: /^([A-Z][^:]*?)(\s+(?:must|should|will|shall|can|may|enables?|provides?|allows?|supports?|delivers?|manages?|includes?|involves?|encompasses?|that|which|to).*)/i, replacement: '$1: $2' }
        ];
        
        // Apply the first matching pattern
        for (const colonPattern of colonPatterns) {
            if (colonPattern.pattern.test(structured)) {
                structured = structured.replace(colonPattern.pattern, colonPattern.replacement);
                break; // Apply only the first matching pattern
            }
        }
        
        // Clean up any redundant colons or spacing
        structured = structured.replace(/:\s*:/, ':');
        structured = structured.replace(/\s+:/, ':');
        structured = structured.replace(/:\s+/, ': ');
        
        // Ensure proper capitalization after colon
        structured = structured.replace(/:(\s*)([a-z])/g, (match, space, letter) => {
            return ':' + space + letter.toUpperCase();
        });
        
        return structured;
    }

    generateGenericDescription(analysis) {
        // Human-like generic descriptions
        const humanDescriptions = [
            'Business process functionality',
            'System operation and management',
            'User workflow support',
            'Data handling and processing',
            'Application feature set',
            'Service delivery mechanism',
            'Information management tool',
            'Operational capability'
        ];
        
        let description = humanDescriptions[Math.floor(Math.random() * humanDescriptions.length)];
        
        // Personalize based on analysis
        if (analysis.priority === 'high') {
            description = `Critical ${description.toLowerCase()}`;
        }
        
        if (analysis.userImpact === 'high') {
            description = description.replace('functionality', 'user-focused functionality');
            description = description.replace('tool', 'user-friendly tool');
        }
        
        return description;
    }

    generateIntelligentComments(analysis, ursRow) {
        const originalComment = ursRow['Comment'];
        
        // If URS comment is N/A, empty, or undefined, return N/A for FS comment
        if (!originalComment || 
            originalComment.trim() === '' || 
            originalComment.trim().toLowerCase() === 'n/a' ||
            originalComment.trim().toLowerCase() === 'na' ||
            originalComment.trim() === '-') {
            return 'N/A';
        }
        
        // Simply return the original comment for FS
        return originalComment;
    }

    // Main transformation method
    transformURSToFS(ursRow, fsIndex) {
        console.log(`AI: Analyzing requirement ${fsIndex}...`);
        
        // Perform comprehensive analysis
        const analysis = this.analyzeRequirement(ursRow);
        
        // Generate enhanced FS components
        const fsId = `FS-${String(fsIndex).padStart(3, '0')}`;
        const feature = this.generateFeatureFunction(analysis, ursRow);
        const description = this.generateEnhancedDescription(analysis, ursRow);
        const comments = this.generateIntelligentComments(analysis, ursRow);
        
        console.log(`AI: Generated ${analysis.primaryIntent}-based feature`);
        
        return {
            'FS ID': fsId,
            'Reference URS ID': ursRow['Requirement ID'],
            'Feature/Function': feature,
            'Description': description,
            'Comments': comments,
            'Requirement Active?': ursRow['Requirement Active?'],
            '_aiAnalysis': analysis
        };
    }

    translateURSToFS(ursDescription, analysis) {
        // Clean and normalize the URS description
        let cleanDesc = ursDescription.trim();
        
        // Convert "shall/must/should" requirements to "provides/enables" functionality
        cleanDesc = cleanDesc.replace(/\b(the system|system|application|app)\s+(shall|must|should|will|needs? to|has to)\s+/gi, '');
        cleanDesc = cleanDesc.replace(/\b(user|users)\s+(shall|must|should|will|can|may)\s+/gi, 'User ');
        cleanDesc = cleanDesc.replace(/\b(shall|must|should|will|needs? to|has to)\s+/gi, '');
        
        // Transform requirement language to functional description
        const transformations = {
            // Authentication/Login patterns
            'login': 'User authentication system',
            'log in': 'User authentication system', 
            'sign in': 'User authentication system',
            'authenticate': 'Authentication mechanism',
            'verify credentials': 'Credential verification',
            'password': 'Password management',
            
            // Data processing patterns
            'calculate': 'Calculation engine',
            'compute': 'Computation system',
            'process data': 'Data processing',
            'validate': 'Data validation',
            'transform': 'Data transformation',
            'convert': 'Data conversion',
            
            // User interface patterns
            'display': 'Display functionality',
            'show': 'Information display',
            'present': 'Data presentation',
            'interface': 'User interface',
            'screen': 'Screen interface',
            'form': 'Form interface',
            
            // Storage patterns
            'store': 'Data storage',
            'save': 'Data persistence',
            'database': 'Database management',
            'backup': 'Backup system',
            'archive': 'Data archiving',
            
            // Search patterns
            'search': 'Search functionality',
            'find': 'Search capability',
            'lookup': 'Data lookup',
            'query': 'Query system',
            'filter': 'Filtering system',
            
            // Reporting patterns
            'report': 'Report generation',
            'generate report': 'Report generation',
            'export': 'Data export',
            'print': 'Print functionality',
            'dashboard': 'Dashboard interface',
            
            // Notification patterns
            'notify': 'Notification system',
            'alert': 'Alert mechanism',
            'email': 'Email notification',
            'message': 'Message delivery',
            'inform': 'Information delivery',
            
            // Integration patterns
            'integrate': 'System integration',
            'connect': 'System connectivity',
            'interface with': 'External interface',
            'API': 'API integration',
            'sync': 'Data synchronization',
            
            // Workflow patterns
            'approve': 'Approval workflow',
            'review': 'Review process',
            'workflow': 'Business workflow',
            'route': 'Request routing',
            'assign': 'Task assignment'
        };
        
        // Apply transformations
        let fsDescription = cleanDesc;
        for (const [pattern, replacement] of Object.entries(transformations)) {
            const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
            if (regex.test(fsDescription)) {
                fsDescription = replacement;
                break; // Use first match to avoid over-transformation
            }
        }
        
        // If no specific transformation matched, create a generic functional description
        if (fsDescription === cleanDesc) {
            fsDescription = this.createFunctionalDescription(cleanDesc, analysis);
        }
        
        // Ensure it's concise and business-focused
        fsDescription = this.makeDescriptionConcise(fsDescription);
        
        return fsDescription;
    }

    createFunctionalDescription(description, analysis) {
        // Extract key action words and create functional description
        const actionWords = description.match(/\b(manage|control|handle|enable|provide|support|allow|permit|ensure|maintain|track|monitor|update|create|delete|modify|edit|view|access|retrieve|send|receive)\w*/gi) || [];
        
        if (actionWords.length > 0) {
            const primaryAction = actionWords[0].toLowerCase();
            
            // Map actions to functional descriptions
            const actionMappings = {
                'manage': 'Management system',
                'control': 'Control mechanism',
                'handle': 'Processing capability',
                'enable': 'System capability',
                'provide': 'Service provision',
                'support': 'Support functionality',
                'allow': 'Access control',
                'permit': 'Permission system',
                'ensure': 'Validation system',
                'maintain': 'Maintenance system',
                'track': 'Tracking system',
                'monitor': 'Monitoring capability',
                'update': 'Update functionality',
                'create': 'Creation system',
                'delete': 'Deletion capability',
                'modify': 'Modification system',
                'edit': 'Editing capability',
                'view': 'Viewing system',
                'access': 'Access system',
                'retrieve': 'Retrieval system',
                'send': 'Transmission system',
                'receive': 'Reception capability'
            };
            
            return actionMappings[primaryAction] || 'System functionality';
        }
        
        // Fall back to intent-based description
        const templates = this.functionalTemplates[analysis.primaryIntent];
        if (templates) {
            return templates.descriptions[0];
        }
        
        return 'Business functionality';
    }

    makeDescriptionConcise(description) {
        // Remove redundant words and make concise
        let concise = description;
        
        // Remove redundant modifiers
        concise = concise.replace(/\b(comprehensive|advanced|sophisticated|robust|efficient|effective|optimal|enhanced|improved|streamlined)\s+/gi, '');
        
        // Remove redundant endings
        concise = concise.replace(/\s+(system|functionality|capability|mechanism|feature|module|component|solution)s?$/gi, (match, word) => {
            // Keep only if the description would be too short without it
            return concise.replace(match, '').trim().length < 15 ? ` ${word.toLowerCase()}` : '';
        });
        
        // Ensure proper capitalization
        concise = concise.charAt(0).toUpperCase() + concise.slice(1).toLowerCase();
        
        // Limit to reasonable length
        if (concise.length > 60) {
            concise = concise.substring(0, 57) + '...';
        }
        
        return concise;
    }

    generateHumanThinking(ursDescription, analysis) {
        // Analyze what a human would think when reading the URS description
        const cleanDesc = ursDescription.toLowerCase().trim();
        
        // Pattern-based human thinking
        const thinkingPatterns = {
            // Authentication patterns
            'login|log in|sign in|authenticate|credentials|password|username': 'This is about user authentication',
            'access control|permission|authorize|rights|privilege': 'This is about access control',
            
            // Data processing patterns
            'calculate|compute|process|transform|convert|validate': 'This is about data processing',
            'algorithm|formula|computation|math': 'This involves calculations',
            
            // User interface patterns
            'display|show|present|screen|interface|form|button|menu': 'This is about user interface',
            'user experience|ui|ux|usability': 'This focuses on user experience',
            
            // Storage patterns
            'store|save|database|persist|backup|archive': 'This is about data storage',
            'data management|information|record': 'This involves data management',
            
            // Search patterns
            'search|find|lookup|query|filter|retrieve': 'This is about search functionality',
            'locate|discover|explore': 'This involves finding information',
            
            // Reporting patterns
            'report|dashboard|analytics|chart|graph|export|print': 'This is about reporting',
            'business intelligence|metrics|kpi': 'This involves business analytics',
            
            // Notification patterns
            'notify|alert|email|message|inform|communication': 'This is about notifications',
            'reminder|announcement|update': 'This involves communication',
            
            // Integration patterns
            'integrate|connect|interface|api|sync|external': 'This is about system integration',
            'third party|external system|web service': 'This involves external connectivity',
            
            // Workflow patterns
            'workflow|process|approve|review|route|assign': 'This is about business workflow',
            'automation|orchestration|sequence': 'This involves process automation',
            
            // Security patterns
            'secure|encrypt|protect|security|compliance|audit': 'This is about security',
            'privacy|confidential|sensitive': 'This involves data protection',
            
            // Performance patterns
            'fast|quick|speed|performance|optimize|efficient': 'This is about performance',
            'real time|immediate|instant|response': 'This involves real-time processing'
        };
        
        // Find matching thinking pattern
        for (const [pattern, thinking] of Object.entries(thinkingPatterns)) {
            const regex = new RegExp(`\\b(${pattern})\\b`, 'i');
            if (regex.test(cleanDesc)) {
                return thinking;
            }
        }
        
        // If no specific pattern matches, generate generic human thinking based on analysis
        return this.generateGenericThinking(analysis, cleanDesc);
    }

    generateGenericThinking(analysis, description) {
        // Generate thinking based on primary intent
        const intentThinking = {
            'authentication': 'This is about user authentication',
            'authorization': 'This is about access control',
            'dataProcessing': 'This is about data processing',
            'reporting': 'This is about reporting',
            'search': 'This is about search functionality',
            'notification': 'This is about notifications',
            'integration': 'This is about system integration',
            'storage': 'This is about data storage',
            'security': 'This is about security',
            'userInterface': 'This is about user interface',
            'workflow': 'This is about business workflow',
            'performance': 'This is about performance'
        };
        
        // Get thinking based on primary intent
        let thinking = intentThinking[analysis.primaryIntent] || 'This is about system functionality';
        
        // Add complexity consideration
        if (analysis.complexity === 'complex') {
            thinking += ' and appears complex';
        } else if (analysis.complexity === 'simple') {
            thinking += ' and looks straightforward';
        }
        
        // Add business value consideration
        if (analysis.businessValue === 'high') {
            thinking += ' with high business value';
        }
        
        return thinking;
    }

    generateCohesiveDescription(ursDescription, analysis) {
        const cleanDesc = ursDescription.toLowerCase().trim();
        
        // Generate unique description based on the specific URS content
        const customDescription = this.transformURSDescriptionToFS(ursDescription, analysis);
        
        return customDescription;
    }

    transformURSDescriptionToFS(ursDescription, analysis) {
        // Clean and prepare the URS description
        let cleanedURS = this.cleanURSDescription(ursDescription);
        
        // Directly transform the URS description to FS description
        const fsDescription = this.directTransformURSToFS(cleanedURS, analysis, ursDescription);
        
        return fsDescription;
    }

    directTransformURSToFS(cleanedURS, analysis, originalURS) {
        // Split the description into meaningful parts
        const sentences = cleanedURS.split(/[.!;]/).filter(s => s.trim().length > 0);
        let transformedParts = [];
        
        // Transform each part of the description
        for (let sentence of sentences) {
            const transformed = this.transformSentenceToFunctional(sentence.trim(), analysis);
            if (transformed && transformed.length > 0) {
                transformedParts.push(transformed);
            }
        }
        
        // Combine transformed parts into coherent FS description
        let fsDescription = this.combineTransformedParts(transformedParts, analysis);
        
        // If transformation didn't work well, use direct paraphrasing
        if (!fsDescription || fsDescription.length < 20) {
            fsDescription = this.directParaphraseToFS(cleanedURS, analysis);
        }
        
        // Final cleanup and enhancement
        fsDescription = this.enhanceAndFinalizeDescription(fsDescription, analysis, originalURS);
        
        return fsDescription;
    }

    transformSentenceToFunctional(sentence, analysis) {
        if (!sentence || sentence.length < 5) return '';
        
        let functional = sentence;
        
        // Transform requirement language to functional language
        const transformations = [
            // Action transformations
            { pattern: /\b(allow|enable|permit)\s+(users?|user)\s+to\s+(\w+)/gi, replacement: 'User $3 capability' },
            { pattern: /\b(users?|user)\s+(can|may|shall be able to|should be able to)\s+(\w+)/gi, replacement: 'User $3 functionality' },
            { pattern: /\b(system|application)\s+(shall|must|should|will)\s+(\w+)/gi, replacement: 'System $3 processing' },
            { pattern: /\b(provide|offer|deliver)\s+(\w+)/gi, replacement: '$2 delivery service' },
            { pattern: /\b(ensure|guarantee)\s+(\w+)/gi, replacement: '$2 assurance mechanism' },
            { pattern: /\b(maintain|preserve)\s+(\w+)/gi, replacement: '$2 maintenance system' },
            { pattern: /\b(support|facilitate)\s+(\w+)/gi, replacement: '$2 support framework' },
            { pattern: /\b(manage|control)\s+(\w+)/gi, replacement: '$2 management system' },
            { pattern: /\b(monitor|track)\s+(\w+)/gi, replacement: '$2 monitoring capability' },
            { pattern: /\b(validate|verify|check)\s+(\w+)/gi, replacement: '$2 validation system' },
            { pattern: /\b(process|handle)\s+(\w+)/gi, replacement: '$2 processing engine' },
            { pattern: /\b(store|save|persist)\s+(\w+)/gi, replacement: '$2 storage mechanism' },
            { pattern: /\b(retrieve|fetch|get)\s+(\w+)/gi, replacement: '$2 retrieval system' },
            { pattern: /\b(display|show|present)\s+(\w+)/gi, replacement: '$2 presentation interface' },
            { pattern: /\b(calculate|compute)\s+(\w+)/gi, replacement: '$2 calculation engine' },
            { pattern: /\b(generate|create|produce)\s+(\w+)/gi, replacement: '$2 generation system' },
            { pattern: /\b(send|transmit|deliver)\s+(\w+)/gi, replacement: '$2 transmission service' },
            { pattern: /\b(receive|accept)\s+(\w+)/gi, replacement: '$2 reception mechanism' },
            { pattern: /\b(update|modify|change)\s+(\w+)/gi, replacement: '$2 modification system' },
            { pattern: /\b(delete|remove)\s+(\w+)/gi, replacement: '$2 removal capability' },
            { pattern: /\b(search|find|lookup)\s+(\w+)/gi, replacement: '$2 search functionality' },
            { pattern: /\b(filter|sort)\s+(\w+)/gi, replacement: '$2 filtering system' },
            { pattern: /\b(export|extract)\s+(\w+)/gi, replacement: '$2 export capability' },
            { pattern: /\b(import|load)\s+(\w+)/gi, replacement: '$2 import mechanism' },
            { pattern: /\b(backup|archive)\s+(\w+)/gi, replacement: '$2 backup system' },
            { pattern: /\b(restore|recover)\s+(\w+)/gi, replacement: '$2 recovery mechanism' },
            { pattern: /\b(configure|setup)\s+(\w+)/gi, replacement: '$2 configuration system' },
            { pattern: /\b(integrate|connect)\s+(\w+)/gi, replacement: '$2 integration capability' },
            { pattern: /\b(synchronize|sync)\s+(\w+)/gi, replacement: '$2 synchronization system' },
            { pattern: /\b(notify|alert|inform)\s+(\w+)/gi, replacement: '$2 notification service' },
            { pattern: /\b(approve|authorize)\s+(\w+)/gi, replacement: '$2 approval workflow' },
            { pattern: /\b(assign|allocate)\s+(\w+)/gi, replacement: '$2 assignment system' },
            { pattern: /\b(schedule|plan)\s+(\w+)/gi, replacement: '$2 scheduling capability' },
            { pattern: /\b(report|summarize)\s+(\w+)/gi, replacement: '$2 reporting system' },
            { pattern: /\b(analyze|evaluate)\s+(\w+)/gi, replacement: '$2 analysis engine' },
            
            // Subject-specific transformations
            { pattern: /\blogin\s+(process|procedure|functionality)/gi, replacement: 'User authentication and access control' },
            { pattern: /\bpassword\s+(management|handling|processing)/gi, replacement: 'Password security and credential management' },
            { pattern: /\bdata\s+(entry|input|capture)/gi, replacement: 'Information capture and data entry system' },
            { pattern: /\bfile\s+(upload|download|transfer)/gi, replacement: 'File transfer and document management' },
            { pattern: /\breport\s+(generation|creation|production)/gi, replacement: 'Dynamic report generation and analytics' },
            { pattern: /\bemail\s+(sending|delivery|transmission)/gi, replacement: 'Email communication and message delivery' },
            { pattern: /\bnotification\s+(system|service|mechanism)/gi, replacement: 'Alert notification and communication system' },
            { pattern: /\bsearch\s+(functionality|capability|feature)/gi, replacement: 'Advanced search and information discovery' },
            { pattern: /\bdashboard\s+(display|presentation|interface)/gi, replacement: 'Interactive dashboard and data visualization' },
            { pattern: /\bworkflow\s+(management|control|processing)/gi, replacement: 'Business workflow orchestration and automation' },
            { pattern: /\buser\s+(interface|experience|interaction)/gi, replacement: 'User interface design and interaction management' },
            { pattern: /\bdatabase\s+(operations|management|handling)/gi, replacement: 'Database operations and data persistence' },
            { pattern: /\bapi\s+(integration|connectivity|interface)/gi, replacement: 'API integration and external system connectivity' },
            { pattern: /\bsecurity\s+(measures|controls|protocols)/gi, replacement: 'Security framework and protection protocols' },
            { pattern: /\bvalidation\s+(rules|logic|processing)/gi, replacement: 'Data validation and integrity assurance' },
            { pattern: /\baudit\s+(trail|logging|tracking)/gi, replacement: 'Audit trail and activity monitoring system' },
            { pattern: /\bbackup\s+(procedures|processes|operations)/gi, replacement: 'Data backup and recovery management' },
            { pattern: /\bperformance\s+(optimization|monitoring|management)/gi, replacement: 'System performance optimization and monitoring' },
            { pattern: /\berror\s+(handling|management|processing)/gi, replacement: 'Error handling and exception management' },
            { pattern: /\bconfiguration\s+(management|settings|options)/gi, replacement: 'System configuration and settings management' }
        ];
        
        // Apply transformations
        for (const transform of transformations) {
            if (transform.pattern.test(functional)) {
                functional = functional.replace(transform.pattern, transform.replacement);
                break; // Use first matching transformation
            }
        }
        
        // Clean up the result
        functional = functional.replace(/\s+/g, ' ').trim();
        functional = this.capitalizeFirstLetter(functional);
        
        return functional;
    }

    directParaphraseToFS(cleanedURS, analysis) {
        // Direct paraphrasing when pattern matching doesn't work
        let paraphrased = cleanedURS;
        
        // Remove modal verbs and convert to capability statements
        paraphrased = paraphrased.replace(/\b(shall|must|should|will|can|may|needs? to|has to|is required to)\s+/gi, '');
        
        // Convert user actions to system capabilities
        paraphrased = paraphrased.replace(/\b(user|users|end user|end users)\s+/gi, 'User ');
        paraphrased = paraphrased.replace(/\b(system|application|software)\s+/gi, 'System ');
        
        // Add functional context
        if (!paraphrased.match(/\b(system|capability|functionality|service|mechanism|engine|framework|interface|management|processing|delivery|generation|creation|handling|control)\b/i)) {
            paraphrased += ' functionality';
        }
        
        // Ensure it starts with a capability statement
        if (!paraphrased.match(/^(User|System|Data|Information|Business|Application|Service|Interface|Processing|Management|Security|Performance|Integration|Communication|Workflow|Report|Analytics|Dashboard|Search|Validation|Authentication|Authorization|Notification|Configuration|Monitoring|Backup|Recovery|Export|Import|Storage|Retrieval|Calculation|Generation|Transmission|Reception|Modification|Display|Presentation)/i)) {
            paraphrased = this.addCapabilityPrefix(paraphrased, analysis);
        }
        
        return this.capitalizeFirstLetter(paraphrased);
    }

    addCapabilityPrefix(description, analysis) {
        const prefixes = {
            'authentication': 'User authentication',
            'authorization': 'Access control',
            'dataProcessing': 'Data processing',
            'reporting': 'Report generation',
            'search': 'Search capability',
            'notification': 'Notification service',
            'integration': 'System integration',
            'storage': 'Data storage',
            'security': 'Security framework',
            'userInterface': 'User interface',
            'workflow': 'Workflow management',
            'performance': 'Performance optimization'
        };
        
        const prefix = prefixes[analysis.primaryIntent] || 'System capability';
        return `${prefix} for ${description}`;
    }

    combineTransformedParts(parts, analysis) {
        if (!parts || parts.length === 0) return '';
        
        if (parts.length === 1) {
            return parts[0];
        }
        
        // Intelligently combine multiple parts
        let combined = parts[0];
        
        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            
            // Check if this part adds meaningful information
            if (this.isComplementaryPart(combined, part)) {
                if (part.startsWith('with ') || part.startsWith('including ') || part.startsWith('featuring ')) {
                    combined += ' ' + part;
                } else {
                    combined += ' with ' + part.toLowerCase();
                }
            }
        }
        
        return combined;
    }

    isComplementaryPart(mainPart, additionalPart) {
        // Check if the additional part provides meaningful enhancement
        const mainWords = mainPart.toLowerCase().split(/\s+/);
        const additionalWords = additionalPart.toLowerCase().split(/\s+/);
        
        // If there's significant word overlap, it's redundant
        const overlap = additionalWords.filter(word => mainWords.includes(word));
        return overlap.length < additionalWords.length * 0.7; // Less than 70% overlap
    }

    enhanceAndFinalizeDescription(description, analysis, originalURS) {
        let enhanced = description;
        
        // Add specific technical details if mentioned in original URS
        const technicalDetails = this.extractTechnicalDetails(originalURS);
        if (technicalDetails) {
            enhanced += ` ${technicalDetails}`;
        }
        
        // Add business context if high priority or high business value
        if (analysis.priority === 'high') {
            enhanced = `Critical ${enhanced.toLowerCase()}`;
        } else if (analysis.businessValue === 'high') {
            enhanced = `Strategic ${enhanced.toLowerCase()}`;
        }
        
        // Ensure proper length and formatting
        enhanced = this.finalizeDescription(enhanced, analysis);
        
        return enhanced;
    }

    extractTechnicalDetails(originalURS) {
        const lowerURS = originalURS.toLowerCase();
        const details = [];
        
        // Security-related details
        if (lowerURS.includes('encryption') || lowerURS.includes('secure') || lowerURS.includes('ssl') || lowerURS.includes('https')) {
            details.push('with security encryption');
        }
        
        // Performance-related details
        if (lowerURS.includes('real-time') || lowerURS.includes('immediate') || lowerURS.includes('instant')) {
            details.push('with real-time processing');
        }
        
        // Validation-related details
        if (lowerURS.includes('validation') || lowerURS.includes('verify') || lowerURS.includes('check')) {
            details.push('including data validation');
        }
        
        // Integration-related details
        if (lowerURS.includes('api') || lowerURS.includes('external') || lowerURS.includes('third party')) {
            details.push('with external system integration');
        }
        
        // Notification-related details
        if (lowerURS.includes('email') || lowerURS.includes('sms') || lowerURS.includes('notification')) {
            details.push('with automated notifications');
        }
        
        // Audit-related details
        if (lowerURS.includes('audit') || lowerURS.includes('log') || lowerURS.includes('track')) {
            details.push('including audit trail capabilities');
        }
        
        // Backup-related details
        if (lowerURS.includes('backup') || lowerURS.includes('recovery') || lowerURS.includes('restore')) {
            details.push('with backup and recovery features');
        }
        
        // Format selection details
        if (lowerURS.includes('excel') || lowerURS.includes('pdf') || lowerURS.includes('csv')) {
            details.push('supporting multiple export formats');
        }
        
        return details.length > 0 ? details.slice(0, 2).join(' and ') : '';
    }

    capitalizeFirstLetter(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    finalizeDescription(description, analysis) {
        let final = description.trim();
        
        // Ensure proper capitalization
        final = this.capitalizeFirstLetter(final);
        
        // Remove redundant phrases
        final = final.replace(/\s+(functionality|capability|system|mechanism|service)\s+(functionality|capability|system|mechanism|service)/gi, ' $1');
        final = final.replace(/\s+with\s+with\s+/gi, ' with ');
        final = final.replace(/\s+and\s+and\s+/gi, ' and ');
        final = final.replace(/\s+for\s+for\s+/gi, ' for ');
        final = final.replace(/\s{2,}/g, ' ');
        
        // Ensure reasonable length while maintaining uniqueness
        if (final.length < 40) {
            // Add context-appropriate enhancement if too short
            const contextEnhancements = {
                'high': 'with comprehensive enterprise-grade capabilities',
                'medium': 'with integrated business functionality',
                'low': 'with essential operational features'
            };
            final += ` ${contextEnhancements[analysis.businessValue] || contextEnhancements['medium']}`;
        }
        
        if (final.length > 180) {
            // Trim while preserving key unique elements
            final = final.substring(0, 177) + '...';
        }
        
        // Final quality check: ensure it sounds natural and professional
        final = this.ensureNaturalFlow(final);
        // Grammar enhancement
        final = this.enhanceGrammar(final);
        
        return final;
    }

    // Grammar enhancement for FS descriptions
    enhanceGrammar(description) {
        let text = description;
        // Fix common grammar mistakes and awkward phrasing
        text = text.replace(/\bprovides be\b/gi, 'provides');
        text = text.replace(/\bmust provide be\b/gi, 'must provide');
        text = text.replace(/\bshould provide be\b/gi, 'should provide');
        text = text.replace(/\bapplication must provide be\b/gi, 'application must be');
        text = text.replace(/\binterface must provide be\b/gi, 'interface must be');
        text = text.replace(/\bthe application must provide be\b/gi, 'the application must be');
        text = text.replace(/\bthe interface must provide be\b/gi, 'the interface must be');
        text = text.replace(/\bthe system must provide be\b/gi, 'the system must be');
        text = text.replace(/\buser must provide be\b/gi, 'user must be');
        text = text.replace(/\buser must be be\b/gi, 'user must be');
        text = text.replace(/\bshould be be\b/gi, 'should be');
        text = text.replace(/\bmust be be\b/gi, 'must be');
        text = text.replace(/\bwill be be\b/gi, 'will be');
        text = text.replace(/\bcan be be\b/gi, 'can be');
        text = text.replace(/\bmay be be\b/gi, 'may be');
        text = text.replace(/\bprovides provides\b/gi, 'provides');
        text = text.replace(/\bprovides must\b/gi, 'must provide');
        text = text.replace(/\bprovides should\b/gi, 'should provide');
        text = text.replace(/\bprovides will\b/gi, 'will provide');
        text = text.replace(/\bprovides can\b/gi, 'can provide');
        text = text.replace(/\bprovides may\b/gi, 'may provide');
        text = text.replace(/\bprovides be\b/gi, 'provides');
        text = text.replace(/\bprovides is\b/gi, 'is');
        text = text.replace(/\bprovides are\b/gi, 'are');
        text = text.replace(/\bprovides was\b/gi, 'was');
        text = text.replace(/\bprovides were\b/gi, 'were');
        text = text.replace(/\bprovides has\b/gi, 'has');
        text = text.replace(/\bprovides have\b/gi, 'have');
        text = text.replace(/\bprovides had\b/gi, 'had');
        text = text.replace(/\bprovides will be\b/gi, 'will be');
        text = text.replace(/\bprovides should be\b/gi, 'should be');
        text = text.replace(/\bprovides must be\b/gi, 'must be');
        text = text.replace(/\bprovides can be\b/gi, 'can be');
        text = text.replace(/\bprovides may be\b/gi, 'may be');
        // Capitalize first letter after colon
        text = text.replace(/:(\s*)([a-z])/g, (match, space, letter) => ':' + space + letter.toUpperCase());
        // Remove double spaces
        text = text.replace(/\s{2,}/g, ' ');
        // Remove trailing spaces
        text = text.trim();
        return text;
    }

    ensureNaturalFlow(description) {
        // Make sure the description flows naturally
        let natural = description;
        
        // Fix common flow issues
        natural = natural.replace(/\bwith\s+for\s+/gi, 'for ');
        natural = natural.replace(/\bfor\s+with\s+/gi, 'with ');
        natural = natural.replace(/\band\s+with\s+and\s+/gi, ' with ');
        natural = natural.replace(/\bsystem\s+system\b/gi, 'system');
        natural = natural.replace(/\bmanagement\s+management\b/gi, 'management');
        
        // Ensure proper flow between clauses
        natural = natural.replace(/\s+featuring\s+with\s+/gi, ' featuring ');
        natural = natural.replace(/\s+supporting\s+for\s+/gi, ' supporting ');
        natural = natural.replace(/\s+including\s+with\s+/gi, ' including ');
        
        return natural.trim();
    }

    makeDescriptionUnique(baseDescription, originalURS, ursRow) {
        // Add unique elements from the specific URS to make the FS description truly unique
        const uniqueElements = this.extractUniqueIdentifiers(originalURS, ursRow);
        
        let uniqueDescription = baseDescription;
        
        // Add specific details that make this requirement unique
        if (uniqueElements.specificTerms.length > 0) {
            const specificTerm = uniqueElements.specificTerms[0];
            if (!uniqueDescription.toLowerCase().includes(specificTerm.toLowerCase())) {
                uniqueDescription = this.incorporateSpecificTerm(uniqueDescription, specificTerm);
            }
        }
        
        // Add numerical or quantitative uniqueness
        if (uniqueElements.quantities.length > 0) {
            const quantity = uniqueElements.quantities[0];
            uniqueDescription = this.incorporateQuantity(uniqueDescription, quantity);
        }
        
        // Add domain-specific uniqueness
        if (uniqueElements.domainTerms.length > 0) {
            const domainTerm = uniqueElements.domainTerms[0];
            uniqueDescription = this.incorporateDomainTerm(uniqueDescription, domainTerm);
        }
        
        // Add uniqueness from URS ID or other identifiers
        if (ursRow['Requirement ID']) {
            const ursId = ursRow['Requirement ID'];
            uniqueDescription = this.addReferenceUniqueness(uniqueDescription, ursId);
        }
        
        return uniqueDescription;
    }

    extractUniqueIdentifiers(ursDescription, ursRow) {
        const lowerDesc = ursDescription.toLowerCase();
        
        return {
            specificTerms: this.findSpecificTerms(lowerDesc),
            quantities: this.findQuantitativeElements(lowerDesc),
            domainTerms: this.findDomainSpecificTerms(lowerDesc),
            businessTerms: this.findBusinessSpecificTerms(lowerDesc)
        };
    }

    findSpecificTerms(description) {
        // Find specific, non-generic terms that could make the description unique
        const specificPatterns = [
            // Business specific terms
            /\b(invoice|receipt|purchase\s*order|contract|agreement|policy|procedure)\w*/gi,
            /\b(customer\s*service|help\s*desk|support\s*ticket|incident|request)\w*/gi,
            /\b(inventory|stock|warehouse|shipping|delivery|logistics)\w*/gi,
            /\b(payroll|salary|benefits|vacation|leave|attendance)\w*/gi,
            /\b(budget|forecast|revenue|expense|cost\s*center|profit)\w*/gi,
            /\b(project|milestone|deadline|timeline|gantt|schedule)\w*/gi,
            /\b(quality\s*assurance|testing|validation|verification|compliance)\w*/gi,
            /\b(marketing|campaign|promotion|advertisement|lead|prospect)\w*/gi,
            
            // Technical specific terms
            /\b(database|table|schema|query|index|trigger)\w*/gi,
            /\b(api|endpoint|json|xml|rest|soap|http|https)\w*/gi,
            /\b(encryption|certificate|token|session|cookie|cache)\w*/gi,
            /\b(workflow|pipeline|queue|batch|scheduler|cron)\w*/gi,
            /\b(mobile|tablet|responsive|android|ios|app)\w*/gi,
            /\b(excel|csv|pdf|word|powerpoint|format)\w*/gi,
            
            // Industry specific terms
            /\b(patient|medical|healthcare|hospital|clinic|doctor)\w*/gi,
            /\b(student|teacher|course|curriculum|grade|academic)\w*/gi,
            /\b(loan|mortgage|credit|debit|banking|financial)\w*/gi,
            /\b(manufacturing|production|assembly|quality|defect)\w*/gi,
            /\b(retail|sales|pos|checkout|payment|transaction)\w*/gi,
            /\b(legal|court|case|attorney|law|regulation)\w*/gi
        ];
        
        const terms = [];
        for (const pattern of specificPatterns) {
            const matches = description.match(pattern);
            if (matches) {
                terms.push(...matches.map(m => m.trim()).filter(t => t.length > 3));
            }
        }
        
        // Remove duplicates and return unique terms
        return [...new Set(terms)].slice(0, 3);
    }

    findQuantitativeElements(description) {
        // Find numbers, percentages, time periods, etc.
        const quantitativePatterns = [
            /\b\d+\s*(percent|%|percentage|hours?|minutes?|seconds?|days?|weeks?|months?|years?)/gi,
            /\b(within|after|before|up\s*to|at\s*least|maximum|minimum)\s+\d+\s*\w*/gi,
            /\b\d+\s*(users?|records?|items?|files?|documents?|entries?)/gi,
            /\b(first|second|third|last|\d+(?:st|nd|rd|th))\s+\w*/gi,
            /\b(daily|weekly|monthly|quarterly|annually|hourly)\b/gi,
            /\b(real[\s-]?time|immediate|instant|batch|scheduled)\b/gi
        ];
        
        const quantities = [];
        for (const pattern of quantitativePatterns) {
            const matches = description.match(pattern);
            if (matches) {
                quantities.push(...matches.map(m => m.trim()));
            }
        }
        
        return [...new Set(quantities)].slice(0, 2);
    }

    findDomainSpecificTerms(description) {
        // Find domain-specific terminology
        const domainPatterns = {
            'finance': /\b(accounting|ledger|journal|balance|asset|liability|equity|revenue|expense|depreciation|amortization|accrual|cash\s*flow|roi|npv|irr)\b/gi,
            'hr': /\b(employee|staff|personnel|recruitment|hiring|onboarding|performance\s*review|appraisal|benefits|compensation|termination)\b/gi,
            'healthcare': /\b(patient|diagnosis|treatment|prescription|medical\s*record|insurance|claim|provider|physician|nurse)\b/gi,
            'education': /\b(student|enrollment|curriculum|syllabus|assignment|grade|transcript|diploma|certificate|academic)\b/gi,
            'manufacturing': /\b(production|assembly|quality\s*control|inspection|defect|batch|lot|inventory|bom|work\s*order)\b/gi,
            'legal': /\b(contract|agreement|compliance|regulation|policy|procedure|audit|risk|liability|intellectual\s*property)\b/gi
        };
        
        const domainTerms = [];
        for (const [domain, pattern] of Object.entries(domainPatterns)) {
            const matches = description.match(pattern);
            if (matches && matches.length > 0) {
                domainTerms.push(`${domain}_${matches[0].toLowerCase().replace(/\s+/g, '_')}`);
            }
        }
        
        return domainTerms.slice(0, 2);
    }

    findBusinessSpecificTerms(description) {
        // Find business process specific terms
        const businessPatterns = [
            /\b(approval\s*workflow|review\s*process|escalation|routing|delegation)\w*/gi,
            /\b(sla|service\s*level|kpi|metric|benchmark|threshold)\w*/gi,
            /\b(integration|interface|synchronization|data\s*exchange|import|export)\w*/gi,
            /\b(notification|alert|reminder|escalation|communication)\w*/gi,
            /\b(backup|archive|recovery|restore|disaster\s*recovery)\w*/gi,
            /\b(security|authentication|authorization|permission|access\s*control)\w*/gi
        ];
        
        const terms = [];
        for (const pattern of businessPatterns) {
            const matches = description.match(pattern);
            if (matches) {
                terms.push(...matches.map(m => m.trim().toLowerCase()));
            }
        }
        
        return [...new Set(terms)].slice(0, 2);
    }

    incorporateSpecificTerm(description, term) {
        // Intelligently incorporate specific terms into the description
        const cleanTerm = term.replace(/\w*ing$/, '').replace(/\w*ed$/, '').trim();
        
        if (cleanTerm.length < 3) return description;
        
        // Add as a specialized capability
        if (description.includes('management')) {
            return description.replace('management', `${cleanTerm} management`);
        } else if (description.includes('system')) {
            return description.replace('system', `${cleanTerm} system`);
        } else if (description.includes('functionality')) {
            return description.replace('functionality', `${cleanTerm} functionality`);
        } else {
            return `${description} with specialized ${cleanTerm} handling`;
        }
    }

    incorporateQuantity(description, quantity) {
        // Add quantitative elements as performance or capability indicators
        const lowerQuantity = quantity.toLowerCase();
        
        if (lowerQuantity.includes('real') || lowerQuantity.includes('immediate') || lowerQuantity.includes('instant')) {
            return `${description} with real-time processing capabilities`;
        } else if (lowerQuantity.includes('batch') || lowerQuantity.includes('scheduled')) {
            return `${description} with scheduled batch processing`;
        } else if (lowerQuantity.includes('daily') || lowerQuantity.includes('weekly') || lowerQuantity.includes('monthly')) {
            return `${description} with ${lowerQuantity} processing cycles`;
        } else if (/\d+/.test(quantity)) {
            return `${description} with scalable processing for high-volume operations`;
        }
        
        return description;
    }

    incorporateDomainTerm(description, domainTerm) {
        // Add domain context to the description
        const [domain, term] = domainTerm.split('_');
        
        const domainEnhancements = {
            'finance': 'for financial operations and accounting processes',
            'hr': 'for human resources and employee management',
            'healthcare': 'for healthcare operations and patient management',
            'education': 'for educational administration and student services',
            'manufacturing': 'for production management and quality control',
            'legal': 'for legal compliance and regulatory management'
        };
        
        const enhancement = domainEnhancements[domain];
        if (enhancement && !description.toLowerCase().includes(domain)) {
            return `${description} ${enhancement}`;
        }
        
        return description;
    }

    addReferenceUniqueness(description, ursId) {
        // Add subtle uniqueness based on the URS ID or other reference
        // This ensures even similar requirements get slightly different descriptions
        if (!ursId) return description;
        
        const idVariations = {
            // Based on last character or number in ID
            '1': 'with primary operational focus',
            '2': 'with secondary workflow support',
            '3': 'with tertiary process integration',
            '4': 'with fourth-tier functionality',
            '5': 'with fifth-level capabilities',
            '6': 'with sixth-generation features',
            '7': 'with seventh-tier processing',
            '8': 'with eighth-level automation',
            '9': 'with ninth-tier optimization',
            '0': 'with foundational system support'
        };
        
        // Get last character
        const lastChar = ursId.toString().slice(-1);
        const variation = idVariations[lastChar];
        
        // Only add if it wouldn't make the description too long or redundant
        if (variation && description.length < 100 && !description.includes('with')) {
            return `${description} ${variation}`;
        }
        
        return description;
    }

    finalizeUniqueDescription(description, analysis) {
        // Final cleanup and quality assurance for unique descriptions
        let final = description.trim();
        
        // Ensure proper capitalization
        final = final.charAt(0).toUpperCase() + final.slice(1);
        
        // Remove redundant phrases that might have been added
        final = final.replace(/\s+(system|functionality|capability|management)\s+(system|functionality|capability|management)/gi, ' $1');
        final = final.replace(/\s+with\s+with\s+/gi, ' with ');
        final = final.replace(/\s+and\s+and\s+/gi, ' and ');
        final = final.replace(/\s+for\s+for\s+/gi, ' for ');
        final = final.replace(/\s{2,}/g, ' ');
        
        // Ensure reasonable length while maintaining uniqueness
        if (final.length < 40) {
            // Add context-appropriate enhancement if too short
            const contextEnhancements = {
                'high': 'with comprehensive enterprise-grade capabilities',
                'medium': 'with integrated business functionality',
                'low': 'with essential operational features'
            };
            final += ` ${contextEnhancements[analysis.businessValue] || contextEnhancements['medium']}`;
        }
        
        if (final.length > 180) {
            // Trim while preserving key unique elements
            final = final.substring(0, 177) + '...';
        }
        
        // Final quality check: ensure it sounds natural and professional
        final = this.ensureNaturalFlow(final);
        
        return final;
    }

    ensureNaturalFlow(description) {
        // Make sure the description flows naturally
        let natural = description;
        
        // Fix common flow issues
        natural = natural.replace(/\bwith\s+for\s+/gi, 'for ');
        natural = natural.replace(/\bfor\s+with\s+/gi, 'with ');
        natural = natural.replace(/\band\s+with\s+and\s+/gi, ' with ');
        natural = natural.replace(/\bsystem\s+system\b/gi, 'system');
        natural = natural.replace(/\bmanagement\s+management\b/gi, 'management');
        
        // Ensure proper flow between clauses
        natural = natural.replace(/\s+featuring\s+with\s+/gi, ' featuring ');
        natural = natural.replace(/\s+supporting\s+for\s+/gi, ' supporting ');
        natural = natural.replace(/\s+including\s+with\s+/gi, ' including ');
        
        return natural.trim();
    }
}

// Export for use in main application
window.URSToFSAI = URSToFSAI;
