export default class ProviderNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Provider Not Found';
  }
}
