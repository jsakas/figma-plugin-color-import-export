import { buildImportColors } from './ImportScreen';

describe('buildImportColors', () => {
  it('works with basic import', () => {
    const example = {
      example_color_1: 'rgb(0, 113, 114)',
      example_color_2: 'rgb(242, 147, 37)',
      example_color_3: 'rgb(217, 79, 4)',
    };

    expect(buildImportColors(example)).toEqual([
      {
        name: 'example_color_1',
        r: 0,
        g: 113,
        b: 114,
        a: 1,
      },
      {
        name: 'example_color_2',
        r: 242,
        g: 147,
        b: 37,
        a: 1,
      },
      {
        name: 'example_color_3',
        r: 217,
        g: 79,
        b: 4,
        a: 1,
      },
    ]);
  });

  it('groups by slashes in property name', () => {
    const example = {
      example_color_1: 'rgb(0, 113, 114)',
      'f1/example_color_2': 'rgb(242, 147, 37)',
      'f1/f2/example_color_3': 'rgb(217, 79, 4)',
    };

    expect(buildImportColors(example, { groupColorStyles: true, groupColorCards: true })).toEqual([
      {
        name: 'example_color_1',
        r: 0,
        g: 113,
        b: 114,
        a: 1,
      },
      {
        name: 'example_color_2',
        r: 242,
        g: 147,
        b: 37,
        a: 1,
        stylePath: 'f1',
        cardPath: 'f1',
      },
      {
        name: 'example_color_3',
        r: 217,
        g: 79,
        b: 4,
        a: 1,
        stylePath: 'f1/f2',
        cardPath: 'f1/f2',
      },
    ]);
  });

  it('groups by nested objects', () => {
    const example = {
      example_color_1: 'rgb(0, 113, 114)',
      f1: {
        example_color_2: 'rgb(242, 147, 37)',
        f2: {
          example_color_3: 'rgb(217, 79, 4)',
        },
      },
    };

    expect(buildImportColors(example, { groupColorStyles: true, groupColorCards: true })).toEqual([
      {
        name: 'example_color_1',
        r: 0,
        g: 113,
        b: 114,
        a: 1,
        cardPath: undefined,
        stylePath: undefined,
      },
      {
        name: 'example_color_2',
        r: 242,
        g: 147,
        b: 37,
        a: 1,
        stylePath: 'f1',
        cardPath: 'f1',
      },
      {
        name: 'example_color_3',
        r: 217,
        g: 79,
        b: 4,
        a: 1,
        stylePath: 'f1/f2',
        cardPath: 'f1/f2',
      },
    ]);
  });
});
