import { readdirSync } from 'fs'
import { join } from 'path'

const chaptersDir = join(__dirname, '..', 'chapitres_finaux')

const chapitres = readdirSync(chaptersDir)
  .filter(d => /^chapitre_\d{2}$/.test(d))
  .sort()
  .map(ch => ({
    text: 'Chapitre ' + ch.slice(-2),
    items: []
  }))

const explications = readdirSync(join(__dirname, '..', 'explications'))
  .filter(f => f.endsWith('.md') && f !== 'README.md')
  .sort()
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
      { text: 'Chapitres', items: chapitres },
      { text: 'Explications', link: '/explications/' }
    ],
    sidebar: {
      '/chapitres_finaux/': chapitres,
      '/explications/': explications
    }
  }
}
