import { Accordion } from "flowbite-react";

export default function Faq() {
  return (
    <section className="container mx-auto">
      <div className="w-4/5 mx-auto mt-16">
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>How i register in this website?</Accordion.Title>
            <Accordion.Content>
              <p className="text-gray-500 dark:text-gray-400">
                simply go register page and give your name email and password
                then click register button that it you are a registered user in
                this website.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              how i download the course details pdf?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                go to your desire course details page and here you can find
                download pdf button cick it and your pdf file is reay for
                dowload.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>how i log in this website ?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                simply go login page and here you can find email and password
                input box.fill the input box with given information. and also
                you can login via google and github
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </section>
  );
}
