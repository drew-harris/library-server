import { Box, Title, Text, Code } from "@mantine/core";
import { Prism } from "@mantine/prism";
import type { NextPage } from "next";

const getClassCode = ` const response = await fetch("https://library-server.vercel.app/api/classes");
const classes = await response.json();
`;

const createClassCode = ` const response = await fetch("https://library-server.vercel.app/api/classes", {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Introduction to Programming",
  })

  const myNewClass = await response.json();
  console.log(myNewClass);
});`;

const gotClasses = `[
  {
    "id": "6a8b2453-f9a4-4d3b-bdc6-2f65215fc79d",
    "createdAt": "2022-08-15T19:42:41.660Z",
    "name": "Science",
    "links": [
      {
        "id": "a14c4ee6-5d15-4e2a-ad44-8ebe81b0c660",
        "createdAt": "2022-08-15T19:55:19.660Z",
        "url": "https://classroom.google.com/u/0/",
        "name": "Google Classroom",
        "image": null,
        "classId": "6a8b2453-f9a4-4d3b-bdc6-2f65215fc79d"
      }
    ]
  }
]
`;

const createLinkCode = `const response = await fetch("https://library-server.vercel.app/api/links", {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify({
    classId: "6a8b2453-f9a4-4d3b-bdc6-2f65215fc79d",
    url: "https://classroom.google.com/u/0/",
    name: "Google Classroom",
    image: null,
  })

  const myNewLink = await response.json();
  console.log(myNewLink);
});`;

const createClassResponseCode = `{
  "class": {
    "id": "6a8b2453-f9a4-4d3b-bdc6-2f65215fc79d",
    "createdAt": "2022-08-15T19:42:41.660Z",
    "name": "Science",
    "links": []
  }
}`;

const linkResponseCode = `{
    "id": "a14c4ee6-5d15-4e2a-ad44-8ebe81b0c660",
    "createdAt": "2022-08-15T19:55:19.660Z",
    "url": "https://classroom.google.com/u/0/",
    "name": "Google Classroom",
    "image": null,
    "classId": "6a8b2453-f9a4-4d3b-bdc6-2f65215fc79d"
}`;

const getLinksCode = `const response = await fetch("https://library-server.vercel.app/api/links");
const links = await response.json();
`;

const getLinksForClassCode = `const response = await fetch("https://library-server.vercel.app/api/links/6a8b2453-f9a4-4d3b-bdc6-2f65215fc79d");
const links = await response.json();
`;

const getLinksResponseCode = `[
    {
      "id": "a14c4ee6-5d15-4e2a-ad44-8ebe81b0c660",
      "createdAt": "2022-08-15T19:55:19.660Z",
      "url": "https://classroom.google.com/u/0/",
      "name": "Google Classroom",
      "image": null,
      "classId": "6a8b2453-f9a4-4d3b-bdc6-2f65215fc79d",
      "class": {
        "id": "6a8b2453-f9a4-4d3b-bdc6-2f65215fc79d",
        "createdAt": "2022-08-15T19:42:41.660Z",
        "name": "Science"
      }
    }
]`;

const Home: NextPage = () => {
	return (
		<Box p="xl">
			<Title mb="lg">Library Server</Title>

			<Title order={2} my="sm">
				Getting Classes
			</Title>
			<Prism language="tsx">{getClassCode}</Prism>
			<Title my="sm" order={3}>
				Response Example
			</Title>
			<Prism tabIndex={2} language="json">
				{gotClasses}
			</Prism>

			<Title order={2} my="sm">
				Create Class
			</Title>
			<Prism language="tsx">{createClassCode}</Prism>
			<Title my="sm" order={3}>
				Response Example
			</Title>
			<Prism tabIndex={2} language="json">
				{createClassResponseCode}
			</Prism>

			<Title my="md" order={2}>
				Add A Link
			</Title>
			<Prism language="tsx">{createLinkCode}</Prism>
			<Title order={3}>Response Example</Title>
			<Prism tabIndex={2} language="json">
				{linkResponseCode}
			</Prism>

			<Title my="sm" order={2}>
				Get Links
			</Title>
			<Prism language="tsx">{getLinksCode}</Prism>
			<Title order={3}>Response Example</Title>
			<Prism tabIndex={2} language="json">
				{getLinksResponseCode}
			</Prism>

			<Title my="sm" order={2}>
				Get Links For A Class
			</Title>
			<Prism language="tsx">{getLinksForClassCode}</Prism>
			<Title order={3}>Response Example</Title>
			<Prism tabIndex={2} language="json">
				{getLinksResponseCode}
			</Prism>
		</Box>
	);
};

export default Home;
