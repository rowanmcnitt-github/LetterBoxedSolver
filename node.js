class Node
{
  constructor(word, parent, missingLetters, depth)
  {
    this.word = word;
    this.parent = parent;
    this.mL = missingLetters;
    this.depth = depth;
  }
  getDepth()
  {
    return this.depth;
  }
  getWord()
  {
    return this.word;
  }
  getParent()
  {
    return this.parent;
  }
  getML()
  {
    return this.mL;
  }
  containsInPath(searchWord)
  {
    let explNode = this;
    while(explNode != null)
      {
        if(explNode.getWord() == searchWord){return true;}
        explNode = explNode.getParent();
      }
    return false;
  }
}