import { DocType } from "./DocType"
import { DOMError } from "./DOMError"
import { Document } from "./Document"
import { XMLSpec10 } from "./XMLSpec10"

/**
 * Represents an object providing methods which are not dependent on 
 * any particular document
 */
export class DOMImplementation {

  /**
   * Creates and returns a {@link DocType}.
   * the given `offset`.
   * 
   * @param qualifiedName - the qualified name
   * @param publicId - the `PUBLIC` identifier
   * @param publicId - the `SYSTEM` identifier
   */
  createDocumentType(qualifiedName: string, publicId: string, systemId: string): DocType {
    if (!qualifiedName.match(XMLSpec10.Name))
      throw DOMError.InvalidCharacterError
    if (!qualifiedName.match(XMLSpec10.QName))
      throw DOMError.NamespaceError
      
    return new DocType(qualifiedName, publicId, systemId)
  }

  /**
   * Creates and returns a {@link DocType}.
   * the given `offset`.
   * 
   * @param offset - the offset at which insertion starts
   * @param data - the string of text to add to node data
   */
  createDocument(namespace: string, qualifiedName: string, doctype: DocType | null = null): Document {
    let document = new Document()

    if(doctype)
      document.appendChild(doctype)

    if(qualifiedName) {
      let element = document.createElementNS(namespace, qualifiedName)
      document.appendChild(element)
    }

    return document
  }

  /**
   * Creates and returns a HTML document.
   * 
   * This method is not supported by this module and will throw an
   * exception.
   * 
   * @param title - document title
   */
  createHTMLDocument(title: string = ''): never {
    throw DOMError.NotSupportedError
  }

  /**
   * Obsolete, always returns true.
   */
  hasFeature(): boolean { return true }
}