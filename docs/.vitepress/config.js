import { readdirSync } from 'fs'
import { join } from 'path'

const base = join(__dirname, '..', 'chapitres_finaux')
const chapitres = readdirSync(base)
  .filter(d => /^chapitre_\d{2}$/.test(d))
  .map(d => ({
    text: 'Chapitre ' + d.slice(-2),
    link: `/chapitres_finaux/${d}/part_01`
  }))

const explications = readdirSync(join(__dirname, '..', 'explications'))
  .filter(f => f.endsWith('.md') && f !== 'README.md')
  .map(f => ({
    text: f.replace('.md', ''),
    link: '/explications/' + f.replace('.md', '')
  }))

export default {
  lang: 'en-US',
  title: 'Umbranexus Documentation',
  description: 'Official docs for the Umbranexus project',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Chapitres', link: '/chapitres_finaux/chapitre_01/part_01' },
      { text: 'Explications', link: '/explications/' }
    ],
    sidebar: {
      '/chapitres_finaux/': chapitres,
      '/explications/': explications
    }
  }
}
