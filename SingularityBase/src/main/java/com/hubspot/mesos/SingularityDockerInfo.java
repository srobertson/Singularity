package com.hubspot.mesos;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Optional;

import java.util.Collections;
import java.util.List;

public class SingularityDockerInfo {
  private final String image;
  private final Optional<SingularityDockerNetwork> network;
  private final List<SingularityDockerPortMapping> portMappings;

  @JsonCreator
  public SingularityDockerInfo(@JsonProperty("image") String image,
                               @JsonProperty("network") Optional<SingularityDockerNetwork> network,
                               @JsonProperty("portMappings") Optional<List<SingularityDockerPortMapping>> portMappings) {
    this.image = image;
    this.network = network;
    this.portMappings = portMappings.or(Collections.<SingularityDockerPortMapping>emptyList());
  }

  public String getImage() {
    return image;
  }

  public Optional<SingularityDockerNetwork> getNetwork() {
    return network;
  }

  public List<SingularityDockerPortMapping> getPortMappings() {
    return portMappings;
  }

  @Override
  public String toString() {
    return String.format("DockerInfo [image=%s, network=%s, portMappings=%s]", image, network, portMappings);
  }
}
