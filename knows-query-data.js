const knowsCommonMasterThesisQueryData = {
  query: `
{
  id(_:KNOWS)
  member {
    slug (_: $slug)
    year (_: $year)
    id
    subject @single {
      keywords
      name @single
      text @single
    }
    contactPoint {
      id @single
      givenName @single
      familyName @single
      mbox @single
    }
    numberOfEmployees @single {
      maxValue @single
    }
  }
}`,
  context: `
{
  "@context": {
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "schema": "http://schema.org/",
    "bbc": "http://www.bbc.co.uk/ontologies/coreconcepts/",
    "dp": "http://dbpedia.org/ontology/",
    "member": {"@reverse": "schema:memberOf"},
    "subject": "schema:subject",
    "keywords": "schema:keywords",
    "hasPart": "schema:hasPart",
    "text": "schema:text",
    "contactPoint": "schema:contactPoint",
    "mbox": "foaf:mbox",
    "givenName": {
      "@id": "foaf:givenName",
      "@language": "en"
    },
    "familyName": {
      "@id": "foaf:familyName",
      "@language": "en"
    },
    "numberOfEmployees": "schema:numberOfEmployees",
    "maxValue": "schema:maxValue",
    "additionalType": "schema:additionalType",
    "name": "schema:name",
    "year": "dp:year",
    "slug": "bbc:slug"
  }
}`,
  sources: [
    "https://data.knows.idlab.ugent.be/person/office/#]",
    "https://ruben.verborgh.org/profile/#me",
    "https://pieterheyvaert.com/#me",
    "https://pietercolpaert.be/#me",
    "https://www.rubensworks.net/#me",
    "https://ben.de-meester.org/#me",
    "https://natadimou.com/#me",
    "https://data.knows.idlab.ugent.be/person/femkeongenae/#me",
    "https://data.knows.idlab.ugent.be/person/sofieverbrugge/#me",
    "https://data.knows.idlab.ugent.be/person/office/master-theses.ttl"]
};

const knowsQueryData = [
  // --- '/education/master-thesis/{year}/{slug} (38 entries)'
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "a-linked-data-event-stream-for-telraam-wecount--s-open-data",
      year: "2021"},
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "a-tool-for-the-mayor-of-ghent:-querying-geospatial-data-on-web-scale",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "automatic-railway-compatibility-verification-across-europe",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "authentication-to-decentralized-data-sources-via-walder",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "a-route-planner-based-on-open-data",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "belgian-parliamentary-votes-as-a-knowledge-graph",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "analysis-of-property-graphs-in-sparql-engines",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "analyzing-security-when-querying-over-decentralized-environments",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "address-the-complexity-of-the-web-with-views",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "a-workbench-based-on-nifi:-linked-open-data-at-your-fingertips",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "cultural-heritage-with-iiif-and-event-streams",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "collaborative-storytelling-on-the-semantic-web",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "cross-platform-and-efficient-route-planning-with-webassembly",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "dungeons-and-dragons-as-a-testbed-for-diverse-sequential-recommender-systems",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "building-a-data-strategy-for-the-deparment-of-education-in-flanders",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "efficient-and-secure-querying-of-linked-data-federations",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "caching-and-replication-in-decentralized-linked-data-environments",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "competitive-knowledge-graph-generation",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "decide-yourself-what-happens-with-your-data",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "boosting-analytical-potential-of-health-tracking-data-using-rml-and-solid",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "indexing-personal-data-pods-using-automated-data-shape-generation",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "optimizing-query-evaluation-over-distributed-data-pods",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "help-amateur-hikers-to-find-their-way-through-the-woods",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "making-data-about-artworks-in-ghent-findable,-accessible,-interoperable-and-reusable",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "personal-data-vaults:-techno-economic-analysis-and-potential-impact-on-the-data-ecosystem",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "personalized-and-privacy-aware-route-planning-on-the-web",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "exposing-iot-streams-on-the-semantic-web",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "performance-evaluation-of-the-variety-of-linked-data-interfaces",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "how-can-you-implement-your-right-to-be-forgotten",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "intelligent-sensors",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "taming-decentralized-big-data-streams",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "web-scale-discovery-of-geospatial-data",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "publishing-time-series-snippets-on-the-web",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "prototyping-with-open-urban-digital-twins",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "predict-how-busy-a-certain-part-of-the-city-is-with-open-data",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "query-optimization-using-webassembly",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "query-optimization-using-webgl",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },
  {
    query: knowsCommonMasterThesisQueryData.query,
    queryParameters: {
      slug: "writing-a-highly-efficient-json-ld-parser-for-specific-frames",
      year: "2021"
    },
    context: knowsCommonMasterThesisQueryData.context,
    sources: knowsCommonMasterThesisQueryData.sources
  },

  // --- Navigation bar, from left to right + submenus from top to bottom

  // '/' (projects)
  {
    query: `
{
  id(_:KNOWS)
  hasProject {
    id @single
    name @single
    description @single
    image @single
    url @single @optional
  }
}`,
    context: `
{
  "@context": {
    "schema": "http://schema.org/",
    "image": "schema:image",
    "hasProject": "schema:memberOf",
    "name": "schema:name",
    "description": "schema:description",
    "url": "schema:url",
    "abstract": "schema:abstract",
    "articleBody": "schema:articleBody",
    "created" : {"@reverse": "schema:creator"},
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#"
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#]",
      "https://data.knows.idlab.ugent.be/person/office/news.ttl",
      "https://data.knows.idlab.ugent.be/person/office/projects.ttl"
    ]
  },

  // '/' (news)
  {
    query: `
{
  id(_:KNOWS)
  created {
    id @single
    name @single
    abstract @single
    articleBody @single
  }
}`,
    context: `
{
  "@context": {
    "schema": "http://schema.org/",
    "image": "schema:image",
    "hasProject": "schema:memberOf",
    "name": "schema:name",
    "description": "schema:description",
    "url": "schema:url",
    "abstract": "schema:abstract",
    "articleBody": "schema:articleBody",
    "created" : {"@reverse": "schema:creator"},
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#"
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#]",
      "https://data.knows.idlab.ugent.be/person/office/news.ttl",
      "https://data.knows.idlab.ugent.be/person/office/projects.ttl"
    ]
  },

  // '/research/topics'
  {
    query: `
{
  id(_:KNOWS)
  topics {
    id @single
    name @single
    description @single
    contactPoint @single {
      id @single
      givenName @single
      familyName @single
    }
  }
}`,
    context: `
{
  "@context": {
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "schema": "http://schema.org/",
    "vivo": "http://vivoweb.org/ontology/core#",
    "name": "schema:name",
    "description": "schema:description",
    "contactPoint": "schema:contactPoint",
    "topics": "vivo:hasResearchArea",
    "givenName": {"@id": "foaf:givenName", "@language": "en"},
    "familyName": {"@id": "foaf:familyName", "@language": "en"}
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#",
      "https://ruben.verborgh.org/profile/#me",
      "https://data.knows.idlab.ugent.be/person/doerthe/#me",
      "https://pietercolpaert.be/#me",
      "https://data.knows.idlab.ugent.be/person/office/topics.ttl"
    ]
  },

  // '/research/publications'
  {
    query: `
{
  id(_:KNOWS)
  contributedTo {
    id @single
    name @single
    abstract @single
    authors {
      id @single
      givenName @single
      familyName @single
    }
    isPartOf @single {
      name @single
    }
    about {
      name
    }
  }
}`,
    context: `
{
  "@context": {
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#",
    "schema": "http://schema.org/",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "name": "schema:name",
    "date": "schema:datePublished",
    "abstract": "schema:abstract",
    "authors": "schema:author",
    "isPartOf": "schema:isPartOf",
    "about": "schema:about",
    "givenName": {"@id": "foaf:givenName", "@language": "en"},
    "familyName": {"@id": "foaf:familyName", "@language": "en"},
    "contributedTo": {"@reverse": "schema:contributor"}
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#",
      "https://data.verborgh.org/ruben",
      "https://data.knows.idlab.ugent.be/person/office/publications.ttl"
    ]
  },

  // '/research/projects'
  {
    query: `
{
  id(_:KNOWS)
  hasProject {
    id @single
    name @single
    description @single
    image @single
    url @single @optional
  }
}`,
    context: `
{
  "@context": {
    "schema": "http://schema.org/",
    "image": "schema:image",
    "hasProject": "schema:memberOf",
    "name": "schema:name",
    "description": "schema:description",
    "url": "schema:url",
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#"
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#]",
      "https://data.knows.idlab.ugent.be/person/office/projects.ttl"
    ]
  },

  // '/dev/software'
  {
    query: `
{
  id(_:KNOWS)
  hasSoftware {
    type (_:Software)
    description @single
    name @single
    hasGit @optional @single {
      type(_:Git)
      url @single
    }
  }
}`,
    context: `
{
  "@context": {
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#",
    "schema": "http://schema.org/",
    "doap": "http://usefulinc.com/ns/doap#",
    "type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    "name": "schema:name",
    "description": "schema:description",
    "Software": "schema:SoftwareApplication",
    "Git": "doap:GitRepository",
    "hasSoftware": {"@reverse": "schema:contributor"},
    "hasGit": {"@reverse": "doap:repositoryOf"},
    "url": {"@id": "doap:location"}
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#",
      "https://data.knows.idlab.ugent.be/person/office/software.ttl"
    ]
  },

  // '/dev/tutorials'
  {
    query: `
{
  id(_:KNOWS)
  hasTutorial {
    type (_:Tutorial)
    description @single @optional
    name @single
    url @single
  }
}`,
    context: `
{
  "@context": {
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#",
    "schema": "http://schema.org/",
    "type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    "name": "schema:name",
    "description": "schema:description",
    "Tutorial": "schema:HowTo",
    "hasTutorial": {"@reverse": "schema:contributor"},
    "url": "schema:url"
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#",
      "https://data.knows.idlab.ugent.be/person/office/tutorials.ttl"
    ]
  },

  // '/education/master-theses'
  {
    query: `
{
  id(_:KNOWS)
  member {
    slug @single
    year(_:"2021")
    subject @single {
      keywords
      name @single
    }
    contactPoint {
      id @single
      givenName @single
      familyName @single
    }
  }
}`,
    context: `
{
  "@context": {
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#",
    "schema": "http://schema.org/",
    "bbc": "http://www.bbc.co.uk/ontologies/coreconcepts/",
    "dp": "http://dbpedia.org/ontology/",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "member": {"@reverse": "schema:memberOf"},
    "subject": "schema:subject",
    "name": "schema:name",
    "keywords": "schema:keywords",
    "year": "dp:year",
    "slug": "bbc:slug",
    "contactPoint": "schema:contactPoint",
    "givenName": { "@id": "foaf:givenName", "@language": "en" },
    "familyName": { "@id": "foaf:familyName", "@language": "en" }
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#",
      "https://ruben.verborgh.org/profile/#me",
      "https://pieterheyvaert.com/#me",
      "https://pietercolpaert.be/#me",
      "https://www.rubensworks.net/#me",
      "https://ben.de-meester.org/#me",
      "https://natadimou.com/#me",
      "https://data.knows.idlab.ugent.be/person/femkeongenae/#me",
      "https://data.knows.idlab.ugent.be/person/sofieverbrugge/#me",
      "https://data.knows.idlab.ugent.be/person/office/master-theses.ttl"
    ]
  },

  // '/team'
  {
    query: `
{
  id(_:team)
  employee {
    id @single
    givenName @single
    familyName @single
    img @single
    title @single
    email @single
    role @single
  }
}`,
    context: `
{
  "@context": {
    "foaf": "http://xmlns.com/foaf/0.1/",
    "vcard": "http://www.w3.org/2006/vcard/ns#",
    "schema": "http://schema.org/",
    "givenName": {"@id": "foaf:givenName", "@language": "en"},
    "familyName": {"@id": "foaf:familyName", "@language": "en"},
    "img": {"@id": "foaf:img"},
    "employee": "schema:employee",
    "title": "vcard:title",
    "email": "foaf:mbox",
    "knows": "https://data.knows.idlab.ugent.be/person/office/#",
    "team": "knows:team",
    "role": "knows:role"
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#",
      "https://data.knows.idlab.ugent.be/person/office/employees.ttl",
      "https://ben.de-meester.org/#me",
      "https://data.knows.idlab.ugent.be/person/doerthe/#me",
      "https://data.knows.idlab.ugent.be/person/dwightvanlancker/#me",
      "https://data.knows.idlab.ugent.be/person/erikmannens/#me",
      "https://data.knows.idlab.ugent.be/person/geraldh/#me",
      "https://data.knows.idlab.ugent.be/person/harm/#me",
      "https://data.knows.idlab.ugent.be/person/ioannischrysakis/#me",
      "https://data.knows.idlab.ugent.be/person/jeroenwerbrouck/#me",
      "https://data.knows.idlab.ugent.be/person/joachimvh/#me",
      "https://data.knows.idlab.ugent.be/person/martinvanbrabant/#me",
      "https://data.knows.idlab.ugent.be/person/rafbuyle/#me",
      "https://data.knows.idlab.ugent.be/person/rubend/#me",
      "https://data.knows.idlab.ugent.be/person/thomas/#me",
      "https://data.knows.idlab.ugent.be/person/gertjandm/#me",
      "https://dylanvanassche.be#me",
      "https://hvdsomp.info/index.ttl",
      "https://julianrojas.org/#me",
      "https://natadimou.com/#me",
      "https://pietercolpaert.be/#me",
      "https://pieterheyvaert.com/#me",
      "https://ruben.verborgh.org/profile/#me",
      "https://sven-lieber.org/profile#me",
      "https://w3id.org/people/brechtvdv/#me",
      "https://www.rubensworks.net/#me"
    ]
  },

  // '/contact'
  {
    query: `
{
  id(_:KNOWS)
  contactPoint {
    id @single
    givenName @single
    familyName @single
    img @single
  }
  location @single {
    name @single
    address @single
  }
}`,
    context: `
{
  "@context": {
    "foaf": "http://xmlns.com/foaf/0.1/",
    "vcard": "http://www.w3.org/2006/vcard/ns#",
    "schema": "http://schema.org/",
    "givenName": {"@id": "foaf:givenName", "@language": "en"},
    "familyName": {"@id": "foaf:familyName", "@language": "en"},
    "img": {"@id": "foaf:img"},
    "contactPoint": "schema:contactPoint",
    "location": "schema:location",
    "address": "schema:address",
    "name": "schema:name",
    "title": "vcard:title",
    "huisnummer": "vl:huisnummer",
    "KNOWS": "https://data.knows.idlab.ugent.be/person/office/#"
  }
}`,
    sources: [
      "https://data.knows.idlab.ugent.be/person/office/#",
      "https://ruben.verborgh.org/profile/#me"
    ]
  }
];

module.exports = knowsQueryData;

