import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import swaggerJSDoc from "swagger-jsdoc";
import { version } from 'os';
import { url } from 'inspector';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const loadYaml = (filePath) => yaml.load(fs.readFileSync(filePath, 'utf8'));

// Merge all yaml files in a directory into one object
const mergeYamlDir = (dir) => {
    const dirPath = path.join(__dirname, dir);
    return fs.readdirSync(dirPath)
        .filter(f => f.endsWith('.yaml'))
        .reduce((acc, file) => ({
            ...acc,
            ...loadYaml(path.join(dirPath, file))
        }), {});
};

const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Weather Intelligence API',
        version: '1.0.0',
        description: 'Real-time weather data with generated insights',
    },
    servers: [
        {
            url: '/api/v1', description: 'Development server'
        }
    ],
    paths: mergeYamlDir('paths'),
    components: {
        schemas: mergeYamlDir('components')
    }
}

export default swaggerSpec;