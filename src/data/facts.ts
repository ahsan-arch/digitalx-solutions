import factsData from "../../data/facts.json";

export type CompanyFacts = typeof factsData.company;
export type LeadershipFacts = typeof factsData.leadership;
export type Certification = typeof factsData.partnerCertifications[number];
export type ClientProject = typeof factsData.clientProjects[number];
export type Testimonial = typeof factsData.testimonials[number];

export const facts = factsData;
export const clientProjects = factsData.clientProjects.map((p) => ({
  ...p,
  slug: p.id,
}));
export default factsData;
