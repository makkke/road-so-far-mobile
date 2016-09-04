provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}

module "consul" {
  source = "github.com/hashicorp/consul/terraform/aws"

  key_name = "AWS SSH KEY NAME"
  key_path = "PATH TO ABOVE PRIVATE KEY"
  region = "us-west-2"
  servers = "3"
}

output "consul_address" {
    value = "${module.consul.server_address}"
}

# resource "aws_instance" "example" {
#   ami           = "ami-7172b611"
#   instance_type = "t2.nano"
# }

# resource "aws_eip" "ip" {
#   instance = "${aws_instance.example.id}"
# }

# output "ip" {
#   value = "${aws_eip.ip.public_ip}"
# }