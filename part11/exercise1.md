# Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by google.

- Travis-CI is a CI system that’s pretty simple to set up quickly and efficiently. It’s completely free for
  open-source projects, which makes it a quick win for CI in your OSS Node.js applications.

- When building out my awesome-hyper list, I ended up landing on Travis CI with some CI/CD automation tooling
  (see Danger further down in the article) to ensure that commits didn’t have broken links. Because of just
  how fast I was able to set it up, it was a super easy win as a maintainer of the repo.

# What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask google!

- Travis-CI : Self-hosted
- Azure : cloud-based CI/CD system

# Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

|                      | Self-Hosted                                                                               | Cloud-Hosted                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Infrastructure Costs | Larger capital costs for network and server infrastructure is required every 3 to 5 years | Smaller recurrent costs every month or year based on the IT resource utilization |
