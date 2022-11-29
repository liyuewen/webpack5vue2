import { factory } from "typescript"

export function createParameterDeclaration(name: string) {
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    factory.createIdentifier(name),
    undefined,
    undefined,
    undefined
  )
}