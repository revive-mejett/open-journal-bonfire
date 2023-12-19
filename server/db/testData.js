const positiveTags = [
    {
        keyword: "Had a nice dinner",
        magnitude: 3,
        permanent: true
    },
    {
        keyword: "Had a nice outing",
        magnitude: 2,
        permanent: true
    },
    {
        keyword: "did well on a test",
        magnitude: 3,
        permanent: true
    },
    {
        keyword: "got a partner",
        magnitude: 8,
        permanent: true
    },
    {
        keyword: "bought a car",
        magnitude: 7,
        permanent: true
    },
    {
        keyword: "bought a house",
        magnitude: 9,
        permanent: true
    },
    {
        keyword: "got married",
        magnitude: 10,
        permanent: true
    },
    {
        keyword: "got a job",
        magnitude: 9,
        permanent: true
    },
    {
        keyword: "got an interview",
        magnitude: 5,
        permanent: true
    },
    {
        keyword: "got an offer",
        magnitude: 8,
        permanent: true
    },
    {
        keyword: "aced my exam",
        magnitude: 4,
        permanent: true
    },
    {
        keyword: "got my licence",
        magnitude: 9,
        permanent: true
    },
    {
        keyword: "bought a new pc",
        magnitude: 8,
        permanent: true
    },
    {
        keyword: "went on a trip",
        magnitude: 5,
        permanent: true
    },
    {
        keyword: "today's my birthday",
        magnitude: 7,
        permanent: true
    },
    {
        keyword: "my friend's birthday",
        magnitude: 7,
        permanent: true
    },
    {
        keyword: "my girlfriend's birthday",
        magnitude: 7,
        permanent: true
    },
    {
        keyword: "my boyfriend's birthday",
        magnitude: 7,
        permanent: true
    },
    {
        keyword: "got a new baby",
        magnitude: 6,
        permanent: true
    },
    {
        keyword: "good haircut",
        magnitude: 4,
        permanent: true
    },
    {
        keyword: "went on nice restaurant",
        magnitude: 4,
        permanent: true
    },
    {
        keyword: "passed math",
        magnitude: 4,
        permanent: true
    },
    {
        keyword: "passed science",
        magnitude: 4,
        permanent: true
    },
    {
        keyword: "passed history",
        magnitude: 4,
        permanent: true
    },
    {
        keyword: "got robux",
        magnitude: 5,
        permanent: true
    },
    {
        keyword: "got vbucks",
        magnitude: 5,
        permanent: true
    },
    {
        keyword: "gained new subs on youtube",
        magnitude: 4,
        permanent: true
    },
    {
        keyword: "great day streaming",
        magnitude: 5,
        permanent: true
    },
    {
        keyword: "got promoted",
        magnitude: 7,
        permanent: true
    },
    {
        keyword: "got a raise",
        magnitude: 8,
        permanent: true
    },
    {
        keyword: "got new benefits",
        magnitude: 8,
        permanent: true
    },
    {
        keyword: "got a boyfriend",
        magnitude: 8,
        permanent: true
    },
    {
        keyword: "got a girlfriend",
        magnitude: 8,
        permanent: true
    },
    {
        keyword: "had a crush",
        magnitude: 6,
        permanent: true
    },
    {
        keyword: "moving on to next semester",
        magnitude: 6,
        permanent: true
    },
    {
        keyword: "found an new game on steam",
        magnitude: 4,
        permanent: true
    },
    {
        keyword: "passed french",
        magnitude: 5,
        permanent: true
    },
    {
        keyword: "went to the beach",
        magnitude: 6,
        permanent: true
    },
    {
        keyword: "new laptop",
        magnitude: 6,
        permanent: true
    },
    {
        keyword: "new keyboard",
        magnitude: 5,
        permanent: true
    }
]

const neutralTags = [
    {
        keyword: "nothing too special",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "normal day at work",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "normal day at school",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "ate a decent meal",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "took a test",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "got some homework",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "slept ok",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "busy day at school",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "busy day at work",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "had an interview",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "made errands",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "took a walk",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "exercised",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "did chores",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "cleaned the house",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "did laundry",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "did some homework",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "cloudy day",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "overcast",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "went shopping",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "went somewhere",
        magnitude: 0,
        permanent: true
    },
    {
        keyword: "bought something necessary",
        magnitude: 0,
        permanent: true
    },
]

const negativeTags = [
    {
        keyword: "failed a test in school",
        magnitude: -3,
        permanent: true
    },
    {
        keyword:  "thundering",
        magnitude: -2,
        permanent: true
    },
    {
        keyword:  "lost a team sports game",
        magnitude: -4,
        permanent: true
    },
    {
        keyword:  "had a breakup",
        magnitude: -7,
        permanent: true
    },
    {
        keyword:  "got demoted",
        magnitude: -6,
        permanent: true
    },
    {
        keyword:  "got fired",
        magnitude: -6,
        permanent: true
    },
    {
        keyword:  "got written up",
        magnitude: -4,
        permanent: true
    },
    {
        keyword:  "placed on a PIP", 
        magnitude: -5,
        permanent: true
    },
    {
        keyword: "got laid off",
        magnitude: -6,
        permanent: true
    },
    {
        keyword: "failed a final",
        magnitude: -4,
        permanent: true
    },
    {
        keyword: "failed a course",
        magnitude: 5,
        permanent: true
    },
    {
        keyword: "failed my driving test",
        magnitude: -5,
        permanent: true
    },
    {
        keyword:  "broke something",
        magnitude: -4,
        permanent: true
    },
    {
        keyword:  "had a fight with my parents",
        magnitude: -4,
        permanent: true
    },
    {
        keyword:  "had a fight with my partner",
        magnitude: -4,
        permanent: true
    },
    {
        keyword:  "got sick",
        magnitude: -4,
        permanent: true
    },
    {
        keyword:  "got a cold", 
        magnitude: -3,
        permanent: true
    },
    {
        keyword: "got covid",
        magnitude: -6,
        permanent: true
    },
    {
        keyword:  "injury",
        magnitude: -7,
        permanent: true
    },
    {
        keyword: "failed math",
        magnitude: -5,
        permanent: true
    },
    {
        keyword:  "failed history",
        magnitude: -5,
        permanent: true
    },
    {
        keyword:  "failed french",
        magnitude: -5,
        permanent: true
    },
    {
        keyword:  "got held back", 
        magnitude: -6,
        permanent: true
    },
    {
        keyword: "car broke down",
        magnitude: -5,
        permanent: true
    },
    {
        keyword:  "car got vandalized",
        magnitude: -6,
        permanent: true
    },
    {
        keyword:  "flat tire",
        magnitude: -4,
        permanent: true
    },
    {
        keyword:  "car got git",
        magnitude: -8,
        permanent: true
    },
    {
        keyword:  "had a meal I didint like",
        magnitude: -3,
        permanent: true
    },
    {
        keyword:  "hurt myself by accident",
        magnitude: -4,
        permanent: true
    },
    {
        keyword:  "boyfriend dumped me",
        magnitude: -6,
        permanent: true
    },
    {
        keyword: "girlfriend dumped me",
        magnitude: -6,
        permanent: true
    },
    {
        keyword: "rainy day",
        magnitude: -1,
        permanent: true
    }
]
// let ellis = await FrequentEventTag.insertMany(positiveTags)

export {positiveTags, neutralTags, negativeTags}