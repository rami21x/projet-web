import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create initial users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'sophie@example.com' },
      update: {},
      create: {
        email: 'sophie@example.com',
        name: 'Sophie Martin',
        artistName: 'Sophie M.',
        instagram: '@sophie_art',
      },
    }),
    prisma.user.upsert({
      where: { email: 'marc@example.com' },
      update: {},
      create: {
        email: 'marc@example.com',
        name: 'Marc Laurent',
        artistName: 'Marc L.',
        instagram: '@marc_creates',
      },
    }),
    prisma.user.upsert({
      where: { email: 'amelie@example.com' },
      update: {},
      create: {
        email: 'amelie@example.com',
        name: 'Amélie Dubois',
        artistName: 'Amélie D.',
        instagram: '@amelie_design',
      },
    }),
    prisma.user.upsert({
      where: { email: 'thomas@example.com' },
      update: {},
      create: {
        email: 'thomas@example.com',
        name: 'Thomas Bernard',
        artistName: 'Thomas B.',
        instagram: '@thomas_art',
      },
    }),
    prisma.user.upsert({
      where: { email: 'clara@example.com' },
      update: {},
      create: {
        email: 'clara@example.com',
        name: 'Clara Moreau',
        artistName: 'Clara M.',
        instagram: '@clara_design',
      },
    }),
  ])

  console.log(`✅ Created ${users.length} users`)

  // Create designs
  const designs = await Promise.all([
    prisma.design.create({
      data: {
        title: 'Dualité Urbaine',
        philosophy: 'Explorer la tension entre chaos urbain et sérénité intérieure. Ce design capture le moment où les extrêmes se rencontrent.',
        garmentType: 'tshirt',
        garmentFit: 'oversize',
        garmentColor: '#1A1A1A',
        status: 'approved',
        authorId: users[0].id,
      },
    }),
    prisma.design.create({
      data: {
        title: "L'Écho du Chaos",
        philosophy: 'Le chaos n\'est pas l\'absence d\'ordre, mais un ordre que nous ne comprenons pas encore. Cette pièce incarne cette révélation.',
        garmentType: 'pull',
        garmentFit: 'regular',
        garmentColor: '#8B0000',
        status: 'approved',
        authorId: users[1].id,
      },
    }),
    prisma.design.create({
      data: {
        title: 'Narcisse Digital',
        philosophy: 'Une réflexion sur notre relation avec les écrans et comment ils façonnent notre perception de nous-mêmes.',
        garmentType: 'tshirt',
        garmentFit: 'slim',
        garmentColor: '#FFFFFF',
        status: 'approved',
        authorId: users[2].id,
      },
    }),
    prisma.design.create({
      data: {
        title: 'Harmonie Paradoxale',
        philosophy: 'L\'harmonie naît du conflit résolu. Ce design représente l\'équilibre trouvé dans les contradictions.',
        garmentType: 'pull',
        garmentFit: 'oversize',
        garmentColor: '#3E4149',
        status: 'approved',
        authorId: users[3].id,
      },
    }),
    prisma.design.create({
      data: {
        title: 'Amour Liquide',
        philosophy: 'Inspiré par la fluidité des émotions modernes, ce design capture l\'essence de l\'amour à l\'ère digitale.',
        garmentType: 'tshirt',
        garmentFit: 'regular',
        garmentColor: '#7D0633',
        status: 'approved',
        authorId: users[4].id,
      },
    }),
  ])

  console.log(`✅ Created ${designs.length} designs`)

  // Add likes to designs
  const likes = await Promise.all(
    designs.flatMap((design, designIndex) =>
      users.slice(0, Math.floor(Math.random() * 4) + 2).map((user) =>
        prisma.like.create({
          data: {
            userId: user.id,
            designId: design.id,
          },
        }).catch(() => null) // Ignore duplicates
      )
    )
  )

  console.log(`✅ Created ${likes.filter(Boolean).length} likes`)

  // Add votes to designs
  const votes = await Promise.all(
    designs.flatMap((design) =>
      users.slice(0, Math.floor(Math.random() * 3) + 1).map((user) =>
        prisma.vote.create({
          data: {
            userId: user.id,
            designId: design.id,
            type: 'people',
          },
        }).catch(() => null) // Ignore duplicates
      )
    )
  )

  console.log(`✅ Created ${votes.filter(Boolean).length} votes`)

  // Create guestbook entries
  const guestbookEntries = await Promise.all([
    prisma.guestbookEntry.create({
      data: {
        message: 'ARTERAL transcende la mode. C\'est une expérience philosophique que je porte chaque jour. Le concept de dualité m\'a vraiment fait réfléchir sur ma propre identité.',
        mood: 'inspired',
        authorId: users[0].id,
      },
    }),
    prisma.guestbookEntry.create({
      data: {
        message: 'Enfin une marque qui comprend que le vêtement est bien plus qu\'un tissu. C\'est une pensée incarnée. J\'ai voté pour trois œuvres du concours !',
        mood: 'thoughtful',
        authorId: users[1].id,
      },
    }),
    prisma.guestbookEntry.create({
      data: {
        message: 'La collection Amour ↔ Ennuie m\'a touchée profondément. Merci de créer avec autant d\'intention. J\'ai partagé sur Instagram !',
        mood: 'love',
        authorId: users[2].id,
      },
    }),
    prisma.guestbookEntry.create({
      data: {
        message: 'Je n\'avais jamais pensé à la mode de cette façon. ARTERAL a changé ma perspective sur ce que peut être un vêtement.',
        mood: 'inspired',
        authorId: users[3].id,
      },
    }),
    prisma.guestbookEntry.create({
      data: {
        message: 'Magnifique concept ! L\'idée de porter de l\'art m\'a toujours fasciné et ARTERAL le réalise parfaitement.',
        mood: 'love',
        authorId: users[4].id,
      },
    }),
  ])

  console.log(`✅ Created ${guestbookEntries.length} guestbook entries`)

  // Add likes to guestbook entries
  const guestbookLikes = await Promise.all(
    guestbookEntries.flatMap((entry) =>
      users.slice(0, Math.floor(Math.random() * 3) + 1).map((user) =>
        prisma.like.create({
          data: {
            userId: user.id,
            guestbookId: entry.id,
          },
        }).catch(() => null) // Ignore duplicates
      )
    )
  )

  console.log(`✅ Created ${guestbookLikes.filter(Boolean).length} guestbook likes`)

  // Create newsletter subscribers
  const subscribers = await Promise.all([
    prisma.newsletterSubscriber.upsert({
      where: { email: 'subscriber1@example.com' },
      update: {},
      create: {
        email: 'subscriber1@example.com',
        name: 'Jean Dupont',
        source: 'homepage',
      },
    }),
    prisma.newsletterSubscriber.upsert({
      where: { email: 'subscriber2@example.com' },
      update: {},
      create: {
        email: 'subscriber2@example.com',
        name: 'Marie Curie',
        source: 'footer',
      },
    }),
    prisma.newsletterSubscriber.upsert({
      where: { email: 'subscriber3@example.com' },
      update: {},
      create: {
        email: 'subscriber3@example.com',
        source: 'popup',
      },
    }),
  ])

  console.log(`✅ Created ${subscribers.length} newsletter subscribers`)

  // Create contest submissions
  const contestSubmissions = await Promise.all([
    prisma.contestSubmission.create({
      data: {
        artistName: 'Marie Lefebvre',
        email: 'marie.lefebvre@example.com',
        instagram: '@marie_creates',
        description: 'Un design inspiré par les contrastes de la vie urbaine moderne.',
        accepted: true,
      },
    }),
    prisma.contestSubmission.create({
      data: {
        artistName: 'Lucas Petit',
        email: 'lucas.petit@example.com',
        instagram: '@lucas_design',
        description: 'Exploration de la dualité entre nature et technologie.',
        accepted: true,
      },
    }),
    prisma.contestSubmission.create({
      data: {
        artistName: 'Emma Richard',
        email: 'emma.richard@example.com',
        instagram: '@emma_art',
        description: 'Une pièce qui questionne notre rapport au temps.',
        accepted: false,
      },
    }),
  ])

  console.log(`✅ Created ${contestSubmissions.length} contest submissions`)

  // Initialize site stats
  const totalLikes = await prisma.like.count()
  const totalVotes = await prisma.vote.count()
  const totalMessages = await prisma.guestbookEntry.count()
  const totalDesigns = await prisma.design.count({ where: { status: 'approved' } })

  await prisma.siteStats.upsert({
    where: { id: 'main' },
    update: {
      totalVisitors: 2847, // Simulated initial visitors
      totalDesigns,
      totalVotes,
      totalMessages,
    },
    create: {
      id: 'main',
      totalVisitors: 2847,
      totalDesigns,
      totalVotes,
      totalMessages,
    },
  })

  console.log('✅ Site stats initialized')

  // Create some page views
  const paths = ['/', '/collection', '/studio', '/artistes', '/galerie', '/livre-or']
  const pageViews = await Promise.all(
    Array.from({ length: 50 }).map(() =>
      prisma.pageView.create({
        data: {
          path: paths[Math.floor(Math.random() * paths.length)],
          sessionId: `session-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      })
    )
  )

  console.log(`✅ Created ${pageViews.length} page views`)

  // Create some events
  const eventNames = ['click_cta', 'submit_form', 'download_design', 'share_social', 'vote']
  const events = await Promise.all(
    Array.from({ length: 30 }).map(() =>
      prisma.event.create({
        data: {
          name: eventNames[Math.floor(Math.random() * eventNames.length)],
          category: 'engagement',
          sessionId: `session-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        },
      })
    )
  )

  console.log(`✅ Created ${events.length} events`)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
