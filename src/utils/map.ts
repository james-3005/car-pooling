const uetGridBoundaries = {
  LOW_LAT: 20.99,
  HIGH_LAT: 21.05,
  LOW_LONG: 105.77,
  HIGH_LONG: 105.85,
};

const sz = 0.0025;
const minLat = uetGridBoundaries.LOW_LAT;
const maxLat = uetGridBoundaries.HIGH_LAT;
const minLong = uetGridBoundaries.LOW_LONG;
const maxLong = uetGridBoundaries.HIGH_LONG;

export const genPolygons = () => {
  const polygonList = [];
  for (let i = minLat; i < maxLat + Number.EPSILON; i += sz) {
    for (let j = minLong; j < maxLong + Number.EPSILON; j += sz) {
      const points = [
        { lat: i, lng: j },
        { lat: i, lng: j + sz },
        { lat: i + sz, lng: j + sz },
        { lat: i + sz, lng: j },
      ];
      polygonList.push({
        path: [...points, points[0]],
        strokeColor: "#2F58CD",
        strokeOpacity: 0.7,
        strokeWeight: 1.2,
        fillColor: "transparent",
      });
    }
  }
  return polygonList;
};
