const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogsArray) => {
// (accumulator, currentValue)
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogsArray.length === 0
    ? 0
    : blogsArray.reduce(reducer, 0)
}

const favoriteBlog = (blogsArray) => {
  // (accumulator, currentValue)
  const reducer = (answer, item) => {
    // console.log(answer)
    // console.log(item)
    // console.log('##############################')

    if (answer.likes < item.likes) {
      return item
    }
    return answer
  }

  return blogsArray.length === 0
    ? []
    : blogsArray.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')

  //console.log(groupedByAuthor)

  /* _.maxBy(array, iteratee): This lodash function is used to find the maximum value in an array based on an iteratee function. In this case:
      array: The array of author names obtained from Object.keys(groupedByAuthor).
      iteratee: A function that returns the value by which the maximum is determined. In this case, it's the length of the array of blogs for each author. */

  // (author) is the current author being processed in the iteration

  const authorWithMostBlogs = _.maxBy(Object.keys(groupedByAuthor), (author) => {
    return groupedByAuthor[author].length
  })

  return blogs.length === 0
    ? []
    : {
      author: authorWithMostBlogs,
      blogs: groupedByAuthor[authorWithMostBlogs].length,
    }
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')

  const authorWithMostLikes = _.maxBy(Object.keys(groupedByAuthor), (author) => {
    return _.sumBy(groupedByAuthor[author], 'likes')
  })

  const totalLikes = _.sumBy(groupedByAuthor[authorWithMostLikes], 'likes')

  return blogs.length === 0
    ? []
    : {
      author: authorWithMostLikes,
      likes: totalLikes
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}