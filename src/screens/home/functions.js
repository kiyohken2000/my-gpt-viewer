const getTags = ({images}) => {
  const tagsArray = images.map((item) => {
    const { prompt } = item
    const promptArray = prompt.split(',').map(item => item.trim());
    return promptArray
  })
  const promptArray = tagsArray.flat()
  const uniquePromptArray = [...new Set(promptArray)];
  return uniquePromptArray
}

export { getTags }