/* Ted information about the blocks facilities */
const dataSet = [
  {
    park: false,
    gym: false,
    super_market: false,
    school: false,
  },
  {
    park: false,
    gym: true,
    super_market: true,
    school: true,
  },
  {
    park: false,
    gym: true,
    super_market: false,
    school: false,
  },
  {
    park: false,
    gym: true,
    super_market: false,
    school: true,
  },
  {
    park: true,
    gym: true,
    super_market: true,
    school: false,
  },
];

/* collect an array of blocks which hase the facility */
const FacilitiesPositionsIndexes = {
  park: [],
  gym: [],
  super_market: [],
  school: [],
};
/* minimum distance for each block to each facility as an object will be stored here */
const blockDistancesStatus = [];
/* fill FacilitiesPositionsIndexes */
const FacilitiesPositions = (blockInfo, blockNumber) => {
  for (facility in blockInfo) {
    if (blockInfo[facility])
      FacilitiesPositionsIndexes[facility].push(blockNumber);
  }
};

dataSet.forEach((blockInfo, index) => {
  FacilitiesPositions(blockInfo, ++index);
});

const blockDistancesToFacilities = (blockNumber) => {
  const distances = {};

  for (facility in FacilitiesPositionsIndexes) {
    if (FacilitiesPositionsIndexes[facility].includes(blockNumber)) {
      distances[facility] = 0;
    } else {
      const nearestBlock = Math.min(...FacilitiesPositionsIndexes[facility]);

      /* console.log(Math.abs(blockNumber - nearestBlock)) */
      distances[facility] = Math.abs(blockNumber - nearestBlock);
    }
  }
  return distances;
};

/* First, calculate the sum of the block distances array, then find min sum value and return the block number*/
const findTheBestBlock = () => {
  const totalDistances = [];

  blockDistancesStatus.forEach((item, index) => {
    totalDistances.push(
      Object.values(item).reduce((acc, curr) => (acc += curr), 0)
    );
  });

  const min = Math.min(...totalDistances);

  return totalDistances.findIndex((item) => item === min) + 1;
};
/* fill blockDistancesStatus */
for (let i = 1; i <= dataSet.length; i++) {
  blockDistancesStatus.push(blockDistancesToFacilities(i));
}

console.log("Facilities ditribution: ", FacilitiesPositionsIndexes);
console.log("Block min distance to each facility: ", blockDistancesStatus);
console.log("The best block for Ted: ", findTheBestBlock(blockDistancesStatus));
