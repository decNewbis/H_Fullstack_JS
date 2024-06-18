export const reviewsDb = [
  {
    text: "I am proud to say that after a few months of taking this course...I passed my exam and am now an AWS " +
      "Certified Cloud Practitioner! This content was exactly what the CCP exam covered.",
    author: "Will A",
    courseName: "[NEW] Ultimate AWS Certified Cloud Practitioner - 2022"
  },
  {
    text: "This course helped me freshen up on my product manager skills and land a job at Facebook! Thanks guys :)",
    author: "Ron F",
    courseName: "Become a Product Manager | Learn the Skills & Get the Job"
  },
  {
    text: "One of the best courses on management and leadership I have come across so far. The advice is " +
      "practical, and examples highly relatable. Would help anyone become a better manager.",
    author: "Phillip W",
    courseName: "Leadership: Practical Leadership Skills"
  },
  {
    text: "I highly recommend this course for all budding data scientists. Even people with no prior knowledge " +
      "of any visualization tools can become a master after completing this course.",
    author: "Surya M",
    courseName: "Tableau 2022 A-Z: Hands-On Tableau Training for Data Science"
  }
].map((review, index) => ({...review, key: index}));