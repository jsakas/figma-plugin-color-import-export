import React, { useState, useMemo } from 'react';

import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Help from '@mui/icons-material/Help';

import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';

import Color from 'color';
import { FigmaMessage, ImportColorsMessage, MessageTypes } from 'declarations/messages';
import { PLUGIN_ID } from 'declarations/plugin';
import { ImportColor } from 'declarations/colors';
import { Paint as PaintComponent } from 'app/components/Paint';

import { capitalCase } from 'change-case';

import { theme } from 'utils/theme';
import { CaseTypes, Case, CaseMap } from 'declarations/case';
import Tooltip from '@mui/joy/Tooltip';
import Checkbox from '@mui/joy/Checkbox';

const example = {
  example_color_1: 'rgb(0, 113, 114)',
  example_color_2: 'rgb(242, 147, 37)',
  example_color_3: 'rgb(217, 79, 4)',
};

export type BuildInputOptions = {
  groupColorStyles?: boolean;
  groupColorCards?: boolean;
  basePath?: string;
};

export function buildImportColors(inputObject: Record<string, any>, options: BuildInputOptions = {}): ImportColor[] {
  const { groupColorStyles = false, groupColorCards = false, basePath } = options;

  let ret: ImportColor[] = [];

  for (const [k, v] of Object.entries(inputObject)) {
    if (typeof v === 'string') {
      try {
        const color = Color(v);

        const parts = k.split('/');
        const name = parts.pop();

        if (basePath?.length > 0) {
          parts.unshift(...basePath.split('/'));
        }

        ret.push({
          name: name,
          r: color.red(),
          g: color.green(),
          b: color.blue(),
          a: color.alpha(),
          stylePath: groupColorStyles && parts.length ? parts.join('/') : undefined,
          cardPath: groupColorCards && parts.length ? parts.join('/') : undefined,
        });
      } catch (e) {
        // do nothing
      }
    }

    if (typeof v === 'object') {
      ret.push(
        ...buildImportColors(v, {
          ...options,
          basePath: basePath?.length > 0 ? `${basePath}/${k}` : k,
        })
      );
    }
  }

  return ret;
}

export function ImportScreen() {
  const [input, setInput] = useState<string>(JSON.stringify(example, null, 2));
  const [groupColorStyles, setGroupColorStyles] = useState<boolean>(false);
  const [groupColorCards, setGroupColorCards] = useState<boolean>(false);
  const [caseType, setCaseType] = useState<CaseTypes>(Case.CAPITAL);
  const caseFn = CaseMap[caseType];

  const importColors: ImportColor[] = useMemo(() => {
    const inputObject = JSON.parse(input) as Record<string, any>;

    return buildImportColors(inputObject, { groupColorStyles, groupColorCards });
  }, [input, groupColorStyles, groupColorCards]);

  return (
    <Box width="100%" height="100%">
      <Box sx={{ marginBottom: 2 }}>
        <Typography level="body1" component="h1" fontWeight="bold" fontSize="12px" marginBottom="2">
          Input Colors
        </Typography>

        <Textarea
          sx={{
            fontFamily: 'monospace',
            fontSize: 12,
          }}
          placeholder="Paste color JSON here"
          minRows={5}
          maxRows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Button
          disabled={importColors.length === 0}
          fullWidth
          onClick={() => {
            const message: FigmaMessage<ImportColorsMessage> = {
              pluginId: PLUGIN_ID,
              pluginMessage: {
                type: MessageTypes.IMPORT_COLORS,
                colors: importColors,
                caseType,
              },
            };

            parent.postMessage(message, 'https://www.figma.com');
          }}
        >
          Import
        </Button>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Typography level="body1" component="h1" fontWeight="bold" fontSize="12px" marginRight="4px" id="casing">
            Grouping & Folders
          </Typography>

          <Tooltip title="When enabled, imported styles will treat forward slashes or nested objects as paths, which will be converted to either Folders in the Colors styles panel, or Groups in in the Layers panel">
            <span>
              <Help fontSize="small" />
            </span>
          </Tooltip>
        </Box>

        <Checkbox
          sx={{
            marginBottom: '4px',
            width: '100%',
          }}
          checked={groupColorStyles}
          onChange={() => setGroupColorStyles(!groupColorStyles)}
          size="sm"
          label={
            <Typography level="body3" marginBottom="0">
              Color styles in folders
            </Typography>
          }
        />

        <Checkbox
          sx={{
            marginBottom: '4px',
            width: '100%',
          }}
          checked={groupColorCards}
          onChange={() => setGroupColorCards(!groupColorCards)}
          size="sm"
          label={
            <Typography level="body3" marginBottom="0">
              Color cards in groups
            </Typography>
          }
        />
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
            {Object.keys(CaseMap).map((caseStyle) => {
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

      {importColors?.length > 0 && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography level="body1" component="h1" fontWeight="bold" fontSize="12px" marginBottom="2">
            Import Preview
          </Typography>

          <Box display="grid" gridTemplateColumns="repeat(auto-fill, 25px)" gap="5px">
            {importColors.map((color, i) => {
              return (
                <Tooltip key={i} title={caseFn(color.name)}>
                  <span>
                    <PaintComponent
                      paint={{
                        type: 'SOLID',
                        color: {
                          r: color.r / 255,
                          g: color.g / 255,
                          b: color.b / 255,
                        },
                        opacity: color.a,
                      }}
                    />
                  </span>
                </Tooltip>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
