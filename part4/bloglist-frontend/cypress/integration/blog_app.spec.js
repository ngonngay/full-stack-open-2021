describe('Blog app', function () {
	beforeEach(function () {
		//empty db
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const thang = {
			name: 'thang',
			username: 'thang',
			password: 'thang',
		};
		const yandere = {
			name: 'yandere',
			username: 'yandere',
			password: 'yandere',
		};
		//add test raw user
		cy.request('POST', 'http://localhost:3001/api/users/', thang);
		cy.request('POST', 'http://localhost:3001/api/users/', yandere);
		cy.visit('http://localhost:3000');
	});

	it('Login form is shown', function () {
		cy.contains('Log in');
		// eslint-disable-next-line quotes
		cy.get("input[name='username']");
		// eslint-disable-next-line quotes
		cy.get("input[name='password']");
	}); //5.17
	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			// eslint-disable-next-line quotes
			cy.get("input[name='username']").type('thang');
			// eslint-disable-next-line quotes
			cy.get("input[name='password']").type('thang');
			cy.get('button[type="submit"]').click();
			cy.contains('Login successful');
			cy.contains('thang logged-in');
		});

		it('fails with wrong credentials and the notification shown with unsuccessful login is displayed red.', function () {
			// eslint-disable-next-line quotes
			cy.get("input[name='username']").type('wrong');
			// eslint-disable-next-line quotes
			cy.get("input[name='password']").type('credentials');
			cy.get('button[type="submit"]').click();
			cy.contains('wrong username or password')
				.should('have.css', 'border', '2px solid rgb(250, 0, 0)')
				.and('have.css', 'background-color', 'rgb(231, 231, 231)');
		});
	}); //5.18
	describe('When logged in', function () {
		beforeEach(function () {
			// eslint-disable-next-line quotes
			cy.get("input[name='username']").type('thang');
			// eslint-disable-next-line quotes
			cy.get("input[name='password']").type('thang');
			cy.get('button[type="submit"]').click();

			cy.login({ username: 'thang', password: 'thang' });
		});

		it('A blog can be created', function () {
			cy.contains('Create new blog').click();
			cy.get('input[name="title"]').type('New blog created');
			cy.get('input[name="author"]').type('Cypress test');
			cy.get('input[name="url"]').type(
				'https://fullstackopen.com/en/part5/end_to_end_testing#exercises-5-17-5-22',
			);
			cy.get('button[type="submit"]').click();

			cy.contains('New blog created');
		}); //5.19
		describe('blog exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'Cypress creating a new blog',
					author: 'Cypress',
					url: 'https://www.cypress.io/',
				});
			});

			it('A user can like a blog', function () {
				cy.contains('View').click();
				cy.get('[data-cy="likes"]').should('contain', 0);
				cy.get('[data-cy="like-btn"]').click();
				cy.get('[data-cy=likes]').should('contain', 1);
			});

			it('A user who created the blog can delete it', function () {
				cy.contains('View').click();
				cy.contains('Cypress creating a new blog');
				cy.contains('Delete').click();
				cy.contains('Cypress creating a new blog').should('not.exist');
			});
		});
		describe('and multiple blogs exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'Cypress creating a new blog',
					author: 'Cypress',
					url: 'https://www.cypress.io/',
					likes: 15,
				});
				cy.createBlog({
					title: 'Second blog created',
					author: 'Cypress',
					url: 'https://www.cypress.io/',
					likes: 0,
				});
				cy.createBlog({
					title: 'Third blog created',
					author: 'Cypress',
					url: 'https://www.cypress.io/',
					likes: 2,
				});
			});

			it('Blogs are ordered based on number of likes, in descending order (from most likes till least likes)', function () {
				cy.get('[data-cy="View"]').click({ multiple: true });
				cy.get('[data-cy="blog"]').then(($blog) => {
					expect($blog).to.have.length(3);
					for (let i = 0; i < $blog.length; i++) {
						// Check if the number of likes of current blog is higher than or equal to that of next blog
						if (i < $blog.length - 1) {
							console.log(
								$blog
									.find('[data-cy="likes"]')
									// eslint-disable-next-line no-unexpected-multiline
									[i].innerText.split(' ')[1],
							);
							expect(
								Number(
									$blog
										.find('[data-cy="likes"]')
										// eslint-disable-next-line no-unexpected-multiline
										[i].innerText.split(' ')[1],
								),
							).to.be.least(
								Number(
									$blog.find('[data-cy="likes"]')[
										// eslint-disable-next-line no-unexpected-multiline
										i + 1
									].innerText.split(' ')[1],
								),
							);
							// Check if number of likes of last blog is lower than or equal to that of first blog
						} else {
							expect(
								Number(
									$blog
										.find('[data-cy="likes"]')
										// eslint-disable-next-line no-unexpected-multiline
										[i].innerText.split(' ')[1],
								),
							).to.be.most(
								Number(
									$blog
										.find('[data-cy="likes"]')[0]
										.innerText.split(' ')[1],
								),
							);
						}
					}
				});
			});
		});
	});
});
