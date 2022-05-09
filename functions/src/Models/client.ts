import { Address } from "./address";

class Client {
  id = "";
  FirstName = "";
  LastName = "";
  MiddleName = "";
  Gender = "male" || "female";
  Email = "";
  MobileNumber = "";
  Address = new Address();
  ReferenceName = "";
  ReferenceMobile = "";
}
type Request = {
  body: Client;
  params: { id: string };
};

export { Client, Request };
