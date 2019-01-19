import { ElementCompact } from 'xml-js';
import { Content } from '../models/content';

export function mapToContent(contentJson: ElementCompact): Content {
  return {
    expires: new Date(contentJson.$.Expires),
    maxArrivalScope: parseInt(contentJson.$.MaxArrivalScope, 10),
  };
}
