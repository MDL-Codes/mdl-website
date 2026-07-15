import photoAlex from '../assets/our-team-alex.png'
import photoBrandon from '../assets/our-team-brandon.png'
import photoChristina from '../assets/our-team-christina.png'
import photoJocelyn from '../assets/our-team-jocelyn.png'
import photoMax from '../assets/our-team-max.png'
import photoSaloni from '../assets/our-team-saloni.png'

export type Lead = {
  name: string
  role: string
  quote: string
  photo: string
}

export type Member = {
  name: string
  subteam: string
}

export const leads: Lead[] = [
  {
    name: 'John Doe',
    role: 'Technical Co-Lead',
    quote: '"I eat socks."',
    photo: photoAlex,
  },
  {
    name: 'Jane Doe',
    role: 'Technical Co-Lead',
    quote: '"I also eat socks."',
    photo: photoBrandon,
  },
  {
    name: 'Joe Doe',
    role: 'Operations Co-Lead',
    quote: "\"I don't eat socks.\"",
    photo: photoChristina,
  },
  {
    name: 'Graciela',
    role: 'Operations Co-Lead',
    quote: '"Excited to meet everyone!"',
    photo: photoJocelyn,
  },
  {
    name: 'Ninja Star',
    role: 'Graphics Co-Lead',
    quote: '"I am in my 4th year."',
    photo: photoMax,
  },
  {
    name: 'Roxx Mon',
    role: 'Graphics Co-Lead',
    quote: '"I eat socks, again."',
    photo: photoSaloni,
  },
]

export const members: Member[] = [
  { name: 'Mob Doe', subteam: 'Technical' },
  { name: 'Maps Tody', subteam: 'Technical' },
  { name: 'Goon Goon Wuon', subteam: 'Technical' },
  { name: 'Hen Ten', subteam: 'Technical' },
  { name: 'Eeny Minie', subteam: 'Technical' },
  { name: 'Orion Paul', subteam: 'Technical' },
  { name: 'Eeny Mosh', subteam: 'Graphics' },
  { name: 'Gabriella Carpenter', subteam: 'Graphics' },
  { name: 'Hen Ten', subteam: 'Marketing' },
  { name: 'Maa Zedong', subteam: 'Technical' },
]
