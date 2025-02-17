const users = [
    {
      id: 1,
      name: "John",
      location: "New York",
      friends: [2, 3, 4],
      posts: [
        { content: "Great day at Central Park!", timestamp: "2025-02-10T12:00:00", likes: 15 },
        { content: "Loving the vibes in NYC!", timestamp: "2024-02-15T08:30:00", likes: 8 },
        { content: "Visited the Statue of Liberty today!", timestamp: "2025-02-05T17:45:00", likes: 20 }
      ]
    },
    {
      id: 2,
      name: "Alice",
      location: "San Francisco",
      friends: [1, 3],
      posts: [
        { content: "Hiking in the Bay Area!", timestamp: "2025-02-12T14:20:00", likes: 12 },
        { content: "Enjoying the sunny weather!", timestamp: "2025-02-14T11:10:00", likes: 6 }
      ]
    },
    {
      id: 3,
      name: "Emily",
      location: "Los Angeles",
      friends: [1, 2, 4],
      posts: [
        { content: "Beach day in LA!", timestamp: "2025-02-08T09:45:00", likes: 25 },
        { content: "Exploring Hollywood!", timestamp: "2025-02-16T16:55:00", likes: 5 }
      ]
    },
    {
      id: 4,
      name: "David",
      location: "Chicago",
      friends: [2],
      posts: [
        { content: "Deep dish pizza is the best!", timestamp: "2025-02-11T10:30:00", likes: 18 },
        { content: "Trying out a new jazz club tonight!", timestamp: "2025-02-13T20:00:00", likes: 3 }
      ]
    },
    {
      id: 5,
      name: "Sarah",
      location: "Seattle",
      friends: [3, 1],
      posts: [
        { content: "Coffee time in the Pacific Northwest!", timestamp: "2025-02-09T15:15:00", likes: 9 },
        { content: "Exploring the Olympic National Park!", timestamp: "2025-02-14T07:00:00", likes: 11 }
      ]
    }
  ];
  
  // console.log(users)

  
const filteredUsers = users.filter((userObject => 
    //based on the condition passed here,
    //will return that array
    userObject.location === "Seattle"
))
console.log(filteredUsers)



// 1.	Filter Active Users: Identify users who have posted at least once in the past week (based on timestamp).
function getActiveUsers(users) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return users.filter(user =>
      user.posts.some(post => new Date(post.timestamp) >= oneWeekAgo) // Check if any post is recent
  );
}

console.log(getActiveUsers(users));


// 2.	Extract Popular Posts: From the active users' posts, filter out those with less than 10 likes.
function getPopularPosts(users) {
  return users
      .map(user => user.posts.filter(post => post.likes >= 10)) // Keep posts with 10+ likes
      .filter(posts => posts.length > 0); // Remove empty arrays
}

console.log(getPopularPosts(users));




// 3.	Calculate Average Likes per User: Reduce the remaining popular posts to a single value representing the average number of likes per active user across all their popular posts
function getAverageLikesPerUser(users) {
  const activeUsers = getActiveUsers(users); // Get active users
  const totalLikes = activeUsers
      .map(user => user.posts.reduce((sum, post) => sum + post.likes, 0)) // Sum likes per user
      .reduce((sum, likes) => sum + likes, 0); // Total likes for all active users

  return activeUsers.length > 0 ? totalLikes / activeUsers.length : 0;
}

console.log(getAverageLikesPerUser(users));
