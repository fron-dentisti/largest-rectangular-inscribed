export class NotEnoughVertexesError extends Error {
  constructor() {
    super(`a polygon should have at least 3 vertices!`);
  }
}
