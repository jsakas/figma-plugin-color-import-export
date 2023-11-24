import React, { useMemo, useState } from 'react';
import { Paint as PaintComponent } from 'app/components/Paint';
import { useTheme } from '@mui/joy/styles';

import { download } from 'utils/download';
import { useSelectedPaintStyles } from 'app/hooks/useSelectedPaintStyles';
import { isGradientPaint, isSolidPaint } from 'utils/guards';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { LanguageRecord, Languages, LanguageTypes } from 'declarations/languages';
import copy from 'copy-to-clipboard';
import { capitalCase } from 'change-case';

import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import { NotifyMessage, FigmaMessage, MessageTypes } from 'declarations/messages';
import { PLUGIN_ID } from 'declarations/plugin';
import { CaseTypes, Case, CaseMap } from 'declarations/case';
import { colorToString, solidPaintToColor } from 'utils/color';
import Tooltip from '@mui/joy/Tooltip';
import { ColorModels, ColorModelType } from 'declarations/models';
import { PathHandlingType, PathHandlingTypes } from 'declarations/path';

export function ExportScreen() {
  const theme = useTheme();

  const selectedPaintStyles = useSelectedPaintStyles();

  const [language, setLanguage] = useState<LanguageTypes>(Languages.JSON);
  const languageOptions = useMemo(() => LanguageRecord[language], [language]);

  const [caseType, setCaseType] = useState<CaseTypes>(Case.CONSTANT);
  const caseFn = useMemo(() => {
    if (languageOptions?.supportedCaseStyles.includes(caseType)) {
      return CaseMap[caseType];
    }

    setCaseType(languageOptions.supportedCaseStyles[0]);

    return CaseMap[languageOptions.supportedCaseStyles[0]];
  }, [caseType, languageOptions, setCaseType]);

  const [model, setModel] = useState<ColorModelType>(ColorModels.RGB);

  const [pathHandling, setPathHandling] = useState<PathHandlingType>(PathHandlingTypes.KEEP);

  const hasColorSelection = useMemo(() => selectedPaintStyles?.length > 0, [selectedPaintStyles?.length]);

  const styleObject = useMemo(() => {
    return selectedPaintStyles.reduce((acc, style) => {
      for (const ps of style.paints) {
        if (isSolidPaint(ps)) {
          let result = colorToString(solidPaintToColor(ps), model);
          let name = style.name;
          if (pathHandling == PathHandlingTypes.IGNORE && style.name.includes('/')) {
            name = style.name.substring(style.name.lastIndexOf('/') + 1, style.name.length);
          }
          acc[caseFn(name)] = result;
        }

        if (isGradientPaint(ps)) {
          // TODO - Implement gradientPaintToString
          //
          // See https://github.com/jsakas/figma-plugin-color-import-export/issues/6
          //
          // let result = gradientPaintToString(ps, model)
        }
      }

      return acc;
    }, {});
  }, [selectedPaintStyles, model, caseFn, pathHandling]);

  const compiledTemplate = useMemo(() => {
    if (typeof languageOptions?.templateFunction === 'function') {
      return languageOptions.templateFunction({ colors: styleObject });
    }

    return '';
  }, [styleObject, languageOptions]);

  return (
    <Box width="100%" height="100%">
      <Box sx={{ marginBottom: 2 }}>
        <Typography level="body1" component="h1" fontWeight="bold" fontSize="12px" marginBottom="2">
          Color Selection
        </Typography>

        {hasColorSelection ? (
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, 25px)" gap="5px">
            {selectedPaintStyles.map((style) => {
              if (!isSolidPaint(style.paints[0])) {
                return null;
              }

              return (
                <Tooltip key={style.id} title={capitalCase(style.name)}>
                  <span>
                    <PaintComponent paint={style.paints[0]} />
                  </span>
                </Tooltip>
              );
            })}
          </Box>
        ) : (
          <Box minHeight="25px">
            <Typography level="body3">No colors selected</Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography level="body1" component="h1" fontWeight="bold" fontSize="12px" id="language">
          Language
        </Typography>

        <RadioGroup
          defaultValue={language}
          value={language}
          onChange={(event) => setLanguage(event.target.value as LanguageTypes)}
          aria-labelledby="language"
          name="language"
        >
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap="5px"
            marginTop={theme.spacing(1)}
            marginBottom={theme.spacing(2)}
          >
            {Object.keys(LanguageRecord).map((lt: LanguageTypes) => {
              return <Radio key={lt} value={lt} size="sm" label={<Typography level="body3">{lt}</Typography>} />;
            })}
          </Box>
        </RadioGroup>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography level="body1" component="h1" fontWeight="bold" fontSize="12px" id="casing">
          Casing
        </Typography>

        <RadioGroup
          defaultValue={caseType}
          value={caseType}
          onChange={(event) => setCaseType(event.target.value as CaseTypes)}
          aria-labelledby="casing"
          name="language"
        >
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap="5px"
            marginTop={theme.spacing(1)}
            marginBottom={theme.spacing(2)}
          >
            {languageOptions.supportedCaseStyles.map((caseStyle) => {
              return (
                <Radio
                  key={caseStyle}
                  value={caseStyle}
                  size="sm"
                  label={<Typography level="body3">{capitalCase(caseStyle)}</Typography>}
                />
              );
            })}
          </Box>
        </RadioGroup>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography level="body1" component="h1" fontWeight="bold" fontSize="12px" id="color-model">
          Model
        </Typography>

        <RadioGroup
          defaultValue={model}
          value={model}
          onChange={(event) => setModel(event.target.value as ColorModelType)}
          aria-labelledby="color-model"
          name="color-model"
        >
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap="5px"
            marginTop={theme.spacing(1)}
            marginBottom={theme.spacing(2)}
          >
            {Object.keys(ColorModels).map((model) => {
              return (
                <Radio key={model} value={model} size="sm" label={<Typography level="body3">{model}</Typography>} />
              );
            })}
          </Box>
        </RadioGroup>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography level="body1" component="h1" fontWeight="bold" fontSize="12px" id="color-model">
          Path
        </Typography>

        <RadioGroup
          defaultValue={model}
          value={pathHandling}
          onChange={(event) => setPathHandling(event.target.value as PathHandlingType)}
          aria-labelledby="color-model"
          name="color-model"
        >
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap="5px"
            marginTop={theme.spacing(1)}
            marginBottom={theme.spacing(2)}
          >
            {Object.keys(PathHandlingTypes).map((path) => {
              return (
                <Radio
                  key={path}
                  value={path}
                  size="sm"
                  label={<Typography level="body3">{capitalCase(path)}</Typography>}
                />
              );
            })}
          </Box>
        </RadioGroup>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Button
          disabled={!hasColorSelection}
          variant="solid"
          fullWidth
          size="sm"
          onClick={() => {
            download(compiledTemplate, `colors${languageOptions.extension}`, languageOptions.mimeType);
          }}
        >
          Export Colors
        </Button>
        <Button
          sx={{ marginTop: 1 }}
          disabled={!hasColorSelection}
          variant="outlined"
          fullWidth
          size="sm"
          onClick={() => {
            try {
              copy(compiledTemplate);

              const message: FigmaMessage<NotifyMessage> = {
                pluginId: PLUGIN_ID,
                pluginMessage: {
                  type: MessageTypes.NOTIFY,
                  message: 'Copied to clipboard',
                },
              };

              parent.postMessage(message, 'https://www.figma.com');
            } catch (e) {
              console.error(e);
              const message: FigmaMessage<NotifyMessage> = {
                pluginId: PLUGIN_ID,
                pluginMessage: {
                  type: MessageTypes.NOTIFY,
                  message: 'Failed to copy to clipboard',
                  options: {
                    error: true,
                  },
                },
              };

              parent.postMessage(message, 'https://www.figma.com');
            }
          }}
        >
          Copy to Clipboard
        </Button>
      </Box>

      {hasColorSelection && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography level="body1" component="h1" fontWeight="bold" fontSize="12px" marginBottom="2">
            Preview
          </Typography>

          <code>
            <pre
              style={{
                fontSize: 10,
              }}
            >
              {compiledTemplate}
            </pre>
          </code>
        </Box>
      )}
    </Box>
  );
}
