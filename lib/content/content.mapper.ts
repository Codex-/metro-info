import { ElementCompact } from 'xml-js';
import { Content } from './content.model';

export function mapToContent(contentJson: ElementCompact): Content {
  return {
    expires: new Date(contentJson.$.Expires),
    maxArrivalScope: parseInt(contentJson.$.MaxArrivalScope, 10),
  };
}
