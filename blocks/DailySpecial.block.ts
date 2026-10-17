import { defineBlock, z } from '@kometio/block-sdk';

/**
 * rung 4 of the ladder: a block type Kometio does not have. A restaurant
 * writes its "dish of the day" on a board every morning; this is the board.
 *
 * Three files make one block, and the editor offers it in its block picker as
 * soon as the theme is the site's:
 *
 *   DailySpecial.block.ts      what it is: its fields and their types (this file)
 *   DailySpecial.astro         how it is drawn on the public site
 *   DailySpecial.locales.json  what the editor calls it, in each language
 *
 * Nothing outside this theme changes: no edit to Kometio's block registry, to
 * its renderer or to the editor's own translations.
 */
export const dailySpecialPropsSchema = z.object({
  label: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  note: z.string(),
});
export type DailySpecialProps = z.infer<typeof dailySpecialPropsSchema>;

export default defineBlock({
  type: 'DailySpecial',
  // A key, not a sentence: the words come from DailySpecial.locales.json, in
  // the language the editor is showing.
  label: 'blocks.dailySpecial.label',
  // Where it sits in the picker. A theme's own block chooses among layout,
  // content, conversion, media, socialProof and interactive; the others
  // belong to Kometio's own blocks.
  category: 'content',
  // A lucide icon name, drawn beside the label in the picker and in Layers.
  icon: 'chef-hat',
  schema: dailySpecialPropsSchema,
  // Checked against the schema when the file loads: a default that does not
  // fit fails at once and loudly, not on the first page that uses it.
  defaultProps: {
    label: 'Today’s special',
    name: '',
    description: '',
    price: '',
    note: '',
  },
  fields: [
    {
      kind: 'text',
      key: 'label',
      // `translatable`: each language of the page keeps its own text. A price
      // below is not, the same figure in every language is the point.
      translatable: true,
      // `inlineEditable`: it can be typed on the canvas itself, in place.
      inlineEditable: true,
      label: 'blocks.dailySpecial.fields.label.fieldLabel',
    },
    {
      kind: 'text',
      key: 'name',
      translatable: true,
      inlineEditable: true,
      required: true,
      label: 'blocks.dailySpecial.fields.name.fieldLabel',
    },
    {
      kind: 'textarea',
      key: 'description',
      translatable: true,
      label: 'blocks.dailySpecial.fields.description.fieldLabel',
    },
    {
      kind: 'text',
      key: 'price',
      inlineEditable: true,
      label: 'blocks.dailySpecial.fields.price.fieldLabel',
    },
    {
      kind: 'text',
      key: 'note',
      translatable: true,
      label: 'blocks.dailySpecial.fields.note.fieldLabel',
    },
  ],
  // What a site owner may restyle on this block, and the starting values: the
  // theme's own green and ivory, by name, so the board follows the palette
  // without a color of its own.
  stylableProperties: ['backgroundColor', 'textColor'],
  defaultStyle: {
    backgroundColor: 'var(--gingham-green)',
    textColor: 'var(--gingham-on-green)',
  },
});

// `defineBlock()` does not keep the schema on the descriptor it returns, so it
// is exported here under the name the site's loader looks for: it validates a
// saved block's props before drawing it, the safety net every core block has.
export { dailySpecialPropsSchema as schema };
