import { Box, Button, Card, CardContent, CardHeader, FormControl, Paper, Typography } from '@mui/material';
import React, { createRef, forwardRef, useRef } from 'react';
import StyledMain from '../StyledMain';
import { QrCode as QrCodeComponent } from 'react-qrcode-pretty';
import { AutoField, AutoForm, SelectField } from 'uniforms-mui';
import JSONSchemaBridge from 'uniforms-bridge-json-schema';

import Ajv from 'ajv';
import { MuiColorInput } from 'mui-color-input';
import { useState } from 'react';
import { triggerBase64Download } from 'react-base64-downloader';

const eyesVariantOptions = [
    {
        label: '标准',
        value: 'standard'
    },
    {
        label: '圆角',
        value: 'rounded'
    },
    {
        label: '原点',
        value: 'dots'
    }
];

const qrcodeSchema = {
    title: '设置QrCode属性',
    type: 'object',
    properties: {
        value: { title: '显示值', type: 'string' },
        bodyDivider: { title: '线条分割', type: 'boolean' },
        bodyVariant: { type: 'string' },
        backgroundRounded: { title: '背景圆角', type: 'boolean' },
        eyesVariant: {
            title: '定位点',
            type: 'string'
        },
        eyesColor: { type: 'string' },
        bodyColor: { type: 'string' },
        backgroundColor: { type: 'string' }
    }
};

const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    keywords: ['uniforms']
});

function createValidator(schema) {
    const validator = ajv.compile(schema);

    return (model) => {
        validator(model);
        return null;
        // return validator.errors?.length ? { details: validator.errors } : null;
    };
}

const schemaValidator = createValidator(qrcodeSchema);

const bridge = new JSONSchemaBridge(qrcodeSchema, schemaValidator);

// eslint-disable-next-line react/prop-types
const MuiColorInputWrapper = ({ label, value, handleChange }) => {
    return (
        <Box py={2} flexDirection="row" gap="12px" display="flex" alignItems="center">
            {/* <Typography variant="caption">{label}</Typography> */}
            <MuiColorInput value={value} onChange={handleChange} label={label} />
        </Box>
    );
};

function utf16to8(str) {
    var out, i, len, c;
    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007f) {
            out += str.charAt(i);
        } else if (c > 0x07ff) {
            out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        } else {
            out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        }
    }
    return out;
}

const QrCode = () => {
    const initialModel = {
        eyesVariant: 'gravity',
        backgroundColor: 'rgb(203, 231, 170)',
        backgroundRounded: true,
        bodyDivider: true
    };
    const [model, setModel] = useState(initialModel);

    const handleColorChange = (color) => {
        setModel((prevState) => ({ ...prevState, backgroundColor: color }));
    };

    const onChangeModel = (model) => {
        setModel((prevState) => ({ ...prevState, ...model, value: utf16to8(model.value) }));
    };

    const downloadQrCode = () => {
        const qrcode = document.querySelector('canvas');
        const base64 = qrcode.toDataURL();
        triggerBase64Download(base64, '51cloudclass');
    };

    return (
        <StyledMain>
            <Paper style={{ padding: '24px', display: 'flex', flexDirection: 'row', gap: '12px' }}>
                <Box flex={2}>
                    <Card>
                        {/* <CardHeader title="设置QrCode属性"> </CardHeader> */}
                        <CardContent>
                            <AutoForm onChangeModel={onChangeModel} schema={bridge} onSubmit={console.log}>
                                <AutoField name="value" />
                                <SelectField name="eyesVariant" options={eyesVariantOptions} />
                                <AutoField
                                    name="backgroundColor"
                                    component={MuiColorInputWrapper}
                                    value={model.backgroundColor}
                                    handleChange={handleColorChange}
                                    label="背景颜色"
                                />
                                <Box display="flex" flexDirection="row">
                                    <AutoField name="bodyDivider" value={model.bodyDivider} />
                                    <AutoField name="backgroundRounded" />
                                </Box>
                            </AutoForm>
                        </CardContent>
                    </Card>
                </Box>
                <Box flex={1} justifyContent="center" alignItems="center">
                    <QrCodeComponent
                        className="qrcode-component"
                        value={model.value}
                        variant={{
                            eyes: model.eyesVariant,
                            body: 'fluid'
                        }}
                        color={{
                            eyes: '#223344',
                            body: '#335577'
                        }}
                        padding={20}
                        margin={30}
                        bgColor={model.backgroundColor}
                        bgRounded={model.backgroundRounded}
                        divider={model.bodyDivider}
                    />
                    <Button variant="outlined" onClick={downloadQrCode}>
                        下载
                    </Button>
                </Box>
            </Paper>
        </StyledMain>
    );
};

export default QrCode;
