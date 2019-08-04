const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length == 1) {
    const Totallikes = blogs[0]['likes']
    return Totallikes
  } else {
    const likesArr = blogs.map(blog => blog.likes).reduce((total, item) => total + item)
    return likesArr
  }
}

module.exports = { dummy, totalLikes }