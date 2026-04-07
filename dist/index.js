import './sourcemap-register.cjs';/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

var __createBinding = (undefined && undefined.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (undefined && undefined.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (undefined && undefined.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const settings = __importStar(require("./settings"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function run() {
    try {
        // open default template
        const templateXml = settings.getToolchainsTemplate();
        // update from action input
        settings.update(templateXml);
        // format to xml
        const formattedXml = settings.formatSettings(templateXml);
        // get custom output path
        const settingsPath = getToolchainsPath();
        // write template to filepath
        writeSettings(settingsPath, formattedXml);
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
        else {
            core.setFailed('An unknown error occurred');
        }
    }
}
function getToolchainsPath() {
    const outputFileInput = core.getInput('outputFile');
    if (!outputFileInput) {
        return getDefaultSettingsPath();
    }
    // resolve env variables in path
    if (outputFileInput.trim() != '') {
        return outputFileInput.trim().replace(/\$([A-Z_]+[A-Z0-9_]*)|\${([A-Z0-9_]*)}/ig, (_, a, b) => process.env[a || b] || '');
    }
    return getDefaultSettingsPath();
}
function getDefaultSettingsPath() {
    return path_1.default.join(os_1.default.homedir(), '.m2', 'toolchains.xml');
}
function writeSettings(settingsPath, formattedXml) {
    if (!fs_1.default.existsSync(path_1.default.dirname(settingsPath))) {
        core.info('Creating directory for toolchains.xml: ' + settingsPath);
        fs_1.default.mkdirSync(path_1.default.dirname(settingsPath));
    }
    core.info('Writing toolchains.xml to path: ' + path_1.default.resolve(settingsPath));
    core.info(formattedXml);
    fs_1.default.writeFileSync(settingsPath, formattedXml);
}
run();


//# sourceMappingURL=index.js.map