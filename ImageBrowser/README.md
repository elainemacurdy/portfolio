# The Challenge

__Build a web app using images from Apartment Therapy House Tours.__ We'll give you an API endpoint that pulls random images from our House Tour archives. You'll build a UI that displays each image and lets the user decide whether they like it or not. Liked images will be saved so the user can go back and see them.

We expect candidates to spend at least a few hours on this project, though you are free to spend as much time as you would like. We understand that your time is valuable, so focus on meeting the acceptance criteria first. We encourage you to note improvements you'd make given unlimited time.

Thanks for spending some time on this challenge. We hope you have fun with it!

# Acceptance Criteria

* Images from the API endpoint are shown to the user (see details below).
* Users can like or dislike each image.
* When the user dislikes an image, it disappears and the next image appears.
* When the user likes an image, that image is saved. The image disappears and the next image appears.
* At any time the user can see a list of images they've liked. _(This list can persist across page visits, but isn't required to do so.)_
* The user can keep playing as long as they like — the images keep coming indefinitely.

You may use whatever tools, frameworks, or libraries you'd like. However, we encourage you to use ES6 and a modern stack. You can learn more about our stack [here](https://github.com/apartmenttherapy/meta#stack--tools). Visual and interaction design decisions are left entirely up to you. We're more concerned with how it _works_ than how it _looks_, however you should write this code as if you intend to ship it to production.

If you meet the criteria above and want to earn bonus points, think about how you might extend the features. Maybe users can categorize their liked images? Maybe you have a time limit for each image before it's randomly liked or disliked for you? Implementing new ideas or bringing them to our discussion will likely impress us and earn you a gold star.

# Workflow

Our team is available in Slack for any questions you might have along the way. We often bounce ideas off each other in chat so feel free to use us as sounding board for your thoughts too. Don't be shy! :smile:

__All code should be submitted in Pull Requests.__ That lets us ask questions and offer feedback directly in the code, as our team does every day. You should expect there to be some responses and code changes necessary.

We encourage multiple small PRs through the project, rather than one big PR. This takes discipline on both our sides, but we've found that early feedback helps squash bugs and clarify assumptions before problems become deeply ingrained.

In general, you should leave your PRs open for feedback until they are explicitly approved by someone on our team. But if an open PR is blocking you from making progress, please feel free to merge it. We can always comment on the closed PR and make resultant code changes in a new branch.

__When you feel that the project has met the criteria and you're satisfied with your progress, ping @mattwondra in Slack.__ Then we'll make our final evaluations and recommendations for advancement to the Technical Interview.

# Goals

The goal of this project is to get a sense of how we'd work together in a semi-real-world environment, and hopefully to be a small window for you into our team's process.

There's no simple formula for what we're looking for in your project, but some of the questions we'll be asking ourselves are:
* How was the communication? Were ideas clearly explained and questions succinctly answered?
* Which libraries or tools were chosen and why?
* How was the project organized? Is it clear why this organization was chosen?
* What does the git commit history look like?
* Were automated tests included, and what kind of things were tested?
* How easy would it be to integrate this project into a larger project?

# The API

The core of your app will use this API endpoint that returns an array of image IDs:

#### http://www.apartmenttherapy.com/admin/galleries/sample.json

```
// Example endpoint data
[
  "f84cea9d4aadb6b8827f8fbc1887e945eb5219b1",
  "239637bcc181606cb1523c79b60258811148af5e",
  "ea5ff749bacabd2e64f3b56284a5a29969b2db70",
  "80df0a7ac551ff34c8d45ed23f757d2333944de6",
  "33cd1e2e5cd9974366bc68dccd5b58f5fba36254"
]
```

Every time you hit the endpoint you'll get a different random sample of five image IDs from our House Tour archives. The number of IDs returned is intentionally limited, to prevent data over-fetching while still allowing infinite gameplay. You will need to figure out the best way to use this endpoint to continually feed new images into the app.

The strings in the array are IDs for our images which we serve through Imgix. Read more below about how to build image URLs using this service.


# Imgix

[Imgix](https://imgix.com) is a flexible image rendering service. Each image has a unique string `image_id` and can be resized, cropped, and processed on-the-fly with a structured URL. Our image URLs look like this:

```
http://atmedia.imgix.net/[image_id]?[options]
```

The [Imgix API docs](https://docs.imgix.com/apis/url) list all available processing `options`. Here's a few examples, using an `image_id` of `dd6ec6e780a29ed37044bb40739036b8d71a6803`:

**Full-sized image, no options**  
http://atmedia.imgix.net/dd6ec6e780a29ed37044bb40739036b8d71a6803

**Shrunk to 300px width**  
http://atmedia.imgix.net/dd6ec6e780a29ed37044bb40739036b8d71a6803?w=300

**Shrunk to 300px height**  
http://atmedia.imgix.net/dd6ec6e780a29ed37044bb40739036b8d71a6803?h=300

**Shrunk to fit inside a 200x150px box**  
http://atmedia.imgix.net/dd6ec6e780a29ed37044bb40739036b8d71a6803?w=200&h=150

**Cropped to a 400x200px square**  
http://atmedia.imgix.net/dd6ec6e780a29ed37044bb40739036b8d71a6803?w=400&h=200&fit=crop

**Cropped to a 400x200px square, centered on area with most interesting edges**
http://atmedia.imgix.net/dd6ec6e780a29ed37044bb40739036b8d71a6803?w=400&h=200&fit=crop&crop=edges
