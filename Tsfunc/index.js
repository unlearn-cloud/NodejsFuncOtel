
    import { Resource } from "@opentelemetry/resources";
    import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
    import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
    import { DtSpanExporter, DtSpanProcessor, DtTextMapPropagator, DtSampler } from "@dynatrace/opentelemetry-core";
    import {wrapHandler} from "@dynatrace/opentelemetry-azure-functions";
    

    const provider = new NodeTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "My Service",
      }),
      sampler: new DtSampler(),
      // ...other configurations
    });
    
    const exporter = new DtSpanExporter();
    const processor = new DtSpanProcessor(exporter);
    provider.addSpanProcessor(processor);
    provider.register({
      propagator: new DtTextMapPropagator(),
      // ...other configurations
    });

const httpTrigger = async function (context, req){
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
export default wrapHandler(httpTrigger);