interface Course {
  id: string;
  title: string;
  author: string;
  link: string;
  description: string;
}

export const mockCourses: Course[] = [
  {
    id: "ee4f5ea6-044a-4e9b-8b18-d48e95812336",
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    author: 'CodeUA',
    link: 'https://www.youtube.com/shorts/aiWjUuLWrAo?si=nIZU1o5606KMC5nZ',
    description: 'Master Python by building 100 projects in 100 days. Learn data science, automation, ' +
      'build websites, games and apps!'
  },
  {
    id: "ba9ac3d6-4c11-4ef0-97e8-852681446a86",
    title: '[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02',
    author: 'Anton Robin S.',
    link: 'https://www.youtube.com/shorts/aiWjUuLWrAo?si=nIZU1o5606KMC5nZ',
    description: 'Full Practice Exam included + explanations | Learn Cloud Computing | Pass the AWS Cloud ' +
      'Practitioner CLF-C02 exam!'
  },
  {
    id: "92e4482a-66ef-4b49-b0a9-fb7c365a30d5",
    title: 'Automate the Boring Stuff with Python Programming',
    author: 'Anthony N.',
    link: 'https://www.youtube.com/shorts/aiWjUuLWrAo?si=nIZU1o5606KMC5nZ',
    description: 'A practical programming course for office workers, academics, and administrators who want to' +
      ' improve their productivity.'
  },
  {
    id: "88004269-097c-4cb1-9738-b639d13e26d2",
    title: 'Scratch Game Programming',
    author: 'Antony H.',
    link: 'https://www.youtube.com/shorts/aiWjUuLWrAo?si=nIZU1o5606KMC5nZ',
    description: 'A fun guide to programming for parents & teachers who want to help kids learn to code.'
  },
  {
    id: "5e9246fd-e2ed-4199-9c18-bd9c0dbac98b",
    title: 'React - The Complete Guide 2024 (incl. Next.js, Redux)',
    author: 'Obada Q.',
    link: 'https://www.youtube.com/shorts/aiWjUuLWrAo?si=nIZU1o5606KMC5nZ',
    description: 'Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, ' +
      'Next.js, Best Practices and way more!'
  },
  {
    id: "93a65ea3-296a-45ef-8107-087564a1871a",
    title: 'Typescript & React JS Course with React & Typescript Project',
    author: 'Marcela Fernández P.',
    link: 'https://www.youtube.com/shorts/aiWjUuLWrAo?si=nIZU1o5606KMC5nZ',
    description: 'Typescript and ReactJS course helps you understand React JS &amp; Type script in detail with real' +
      ' Typescript React Projects'
  },
  {
    id: "866c61f9-d6ce-4e6f-a9cc-25845e3f64bf",
    title: 'React JS- Complete Guide for Frontend Web Development',
    author: 'Qazi M.',
    link: 'https://www.youtube.com/shorts/aiWjUuLWrAo?si=nIZU1o5606KMC5nZ',
    description: 'Become an expert React JS Developer. Learn HTML, CSS, JavaScript, ES6, React JS and jQuery.'
  }
];