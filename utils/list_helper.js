const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const blogLikes = blogs.map((blog) => blog.likes)

  return blogs.length === 0
    ? 0
    : blogLikes.reduce((prev, curr) => prev + curr, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((prev, curr) => {
        return curr.likes > prev.likes ? curr : prev
      })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = blogs.map((blog) => blog.author)

  const count = {}

  const total = []

  authors.forEach((author) => {
    if (count[author]) {
      count[author] += 1
    } else {
      count[author] = 1
    }
  })

  for (const property in count) {
    if (Object.hasOwnProperty.call(count, property)) {
      const newObject = { author: property, blogs: count[property] }
      total.push(newObject)
    }
  }

  return total.reduce((prev, curr) => {
    if (!curr) return prev

    return curr.blogs > prev.blogs ? curr : prev
  })
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const manyAuthors = blogs.map((singleAuthor) => {
    return { author: singleAuthor.author, likes: singleAuthor.likes }
  })

  const count = {}

  const total = []

  manyAuthors.forEach((singleAuthor) => {
    if (count[singleAuthor.author]) {
      count[singleAuthor.author] += singleAuthor.likes
    } else {
      count[singleAuthor.author] = singleAuthor.likes
    }
  })

  for (const property in count) {
    if (Object.hasOwnProperty.call(count, property)) {
      const newObject = { author: property, likes: count[property] }
      total.push(newObject)
    }
  }

  return total.reduce((prev, curr) => {
    if (!curr) return prev

    return curr.likes > prev.likes ? curr : prev
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
